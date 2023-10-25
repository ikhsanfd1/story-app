const Dashboard = {
  async init() {
    await this._initialData();
    this._initialListener();
  },

  async _initialData() {
    const fetchRecords = await fetch('/data/DATA.json');
    const responseRecords = await fetchRecords.json();
    this._userListStory = responseRecords.listStory;

    const dataSimpanStoryJSON = localStorage.getItem('dataSimpanStory');
    if (dataSimpanStoryJSON) {
      const dataSimpanStory = JSON.parse(dataSimpanStoryJSON);

      if (Array.isArray(dataSimpanStory)) {
        this._userListStory = dataSimpanStory.concat(this._userListStory);
      }
    }

    this._userListStory.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });

    this._populateListStoryRecordToCard(this._userListStory);
  },

  _initialListener() {
    const lihatLengkapModal = document.getElementById('lihatLengkapModal');
    const editModal = document.getElementById('editModal');
    lihatLengkapModal.addEventListener('show.bs.modal', (e) => {
      const modalTitle = lihatLengkapModal.querySelector('.modal-title');
      modalTitle.focus();

      const button = e.relatedTarget;
      const dataRecord = this._userListStory.find((item) => {
        return item.id == button.dataset.recordId;
      });

      this._populateDetailStoryToModal(dataRecord);
    });

    editModal.addEventListener('show.bs.modal', (e) => {
      const modalTitle = editModal.querySelector('.modal-title');
      modalTitle.focus();

      const button = e.relatedTarget;
      const recordId = this._userListStory.find((item) => {
        return item.id == button.dataset.recordId;
      });

      this._populateEditStoryToModal(recordId);

      const simpanPerubahan = document.getElementById('simpanPerubahan');
      const nameEditRecord = document.querySelector('#editModal #inputNamaEdit');
      const descEditRecord = document.querySelector('#editModal #validasiDeskripsi');
      const validasiPhotoUrl = document.querySelector('#editModal #validasiPhotoUrl');

      simpanPerubahan.addEventListener('click', () => {
        if (recordId) {
          const editedRecord = {
            id: recordId.id,
            name: nameEditRecord.value,
            photoUrl: validasiPhotoUrl.getAttribute('src'),
            description: descEditRecord.value || '',
            createdAt: new Date(),
          };
          console.log(editedRecord);

          this._simpanPerubahanDataDariLocalStorage(editedRecord);
        }
        editModal.classList.remove('show');
        editModal.style.display = 'none';
        document.body.classList.remove('modal-open');
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
          modalBackdrop.remove();
        }
      });
    });

    editModal.addEventListener('hidden.bs.modal', () => {
      this._handleEditModalCancel();
    });

    const deleteModal = document.getElementById('deleteModal');

    deleteModal.addEventListener('show.bs.modal', (e) => {
      const hapusStory = e.relatedTarget;
      const recordId = hapusStory.getAttribute('data-record-id');
      const hapusStoryAnchor = deleteModal.querySelector('#hapusStory');
      hapusStoryAnchor.addEventListener('click', () => {
        this._hapusDataDariLocalStorage(recordId);
        deleteModal.classList.remove('show');
        deleteModal.style.display = 'none';
        document.body.classList.remove('modal-open');
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
          modalBackdrop.remove();
        }
        const successAlert = document.querySelector('#successAlert');
        successAlert.classList.remove('d-none');
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      });
    });
  },

  _populateListStoryRecordToCard(listStory = null) {
    if (!Array.isArray(listStory)) {
      throw new Error(`Data listStory tidak valid. The value is ${listStory}`);
    }

    const recordBodyTable = document.querySelector('#listStories');

    recordBodyTable.innerHTML = '';
    if (listStory.length <= 0) {
      recordBodyTable.innerHTML = this._templateEmptyBodyTable();
      return;
    }

    listStory.forEach((item, idx) => {
      recordBodyTable.innerHTML += this._templateBodyTable(idx, listStory[idx]);
    });
  },

  _populateDetailStoryToModal(listStoryRecord) {
    if (!listStoryRecord) {
      throw new Error(`Data story tidak ditemukan. The value is ${listStoryRecord}`);
    }

    const imgDetailRecord = document.querySelector('#lihatLengkapModal #imgDetailRecord');
    const nameDetailRecord = document.querySelector('#lihatLengkapModal #nameDetailRecord');
    const dateDetailRecord = document.querySelector('#lihatLengkapModal #dateDetailRecord');
    const descDetailRecord = document.querySelector('#lihatLengkapModal #descDetailRecord');

    imgDetailRecord.setAttribute('src', listStoryRecord.photoUrl);
    imgDetailRecord.setAttribute('alt', listStoryRecord.name);
    nameDetailRecord.textContent = listStoryRecord.name;
    dateDetailRecord.textContent = this._formatDate(listStoryRecord.createdAt);
    descDetailRecord.textContent = listStoryRecord.description || '-';
  },

  _populateEditStoryToModal(listStoryRecord) {
    if (!listStoryRecord) {
      throw new Error(`Data story tidak ditemukan. The value is ${listStoryRecord}`);
    }

    const validasiPhotoUrl = document.querySelector('#validasiPhotoUrl');
    const inputImageEdit = document.querySelector('#editModal #inputImageEdit');
    const nameEditRecord = document.querySelector('#editModal #inputNamaEdit');
    const descEditRecord = document.querySelector('#editModal #validasiDeskripsi');

    validasiPhotoUrl.addEventListener('change', (event) => {
      const selectedImage = event.target.files[0];
      if (selectedImage) {
        const reader = new FileReader();

        reader.onload = (e) => {
          validasiPhotoUrl.setAttribute('src', e.target.result);
        };

        reader.readAsDataURL(selectedImage);
      }
    });

    validasiPhotoUrl.setAttribute('src', listStoryRecord.photoUrl);
    validasiPhotoUrl.setAttribute('alt', listStoryRecord.name);
    inputImageEdit.setAttribute('defaultImage', listStoryRecord.photoUrl);
    nameEditRecord.value = listStoryRecord.name;
    descEditRecord.value = listStoryRecord.description || '-';

    const simpanPerubahan = document.getElementById('simpanPerubahan');

    simpanPerubahan.addEventListener('click', () => {
      if (listStoryRecord) {
        const editedRecord = {
          id: listStoryRecord.id,
          name: nameEditRecord.value,
          photoUrl: validasiPhotoUrl.getAttribute('src'),
          description: descEditRecord.value,
          createdAt: new Date(),
        };

        if (this._isValidEdit(listStoryRecord, editedRecord)) {
          this._simpanPerubahanDataDariLocalStorage(editedRecord);
        } else {
          alert('Perubahan tidak valid. ...');
        }
      }

      editModal.classList.remove('show');
      editModal.style.display = 'none';
      document.body.classList.remove('modal-open');
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
      const successEditAlert = document.querySelector('#successEditAlert');
      successEditAlert.classList.remove('d-none');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    });
  },

  _isValidEdit(existingRecord, editedRecord) {
    const errors = [];

    if (!editedRecord.name) {
      errors.push('Nama harus diisi.');
    }

    if (!editedRecord.description) {
      errors.push('Deskripsi harus diisi.');
    }

    if (editedRecord.photoUrl !== existingRecord.photoUrl) {
      errors.push('Anda tidak dapat mengubah gambar saat mengedit.');
    }

    if (errors.length > 0) {
      return { isValid: false, errors };
    }

    return { isValid: true };
  },

  _handleEditModalCancel() {
    const validasiPhotoUrl = document.querySelector('#editModal #validasiPhotoUrl');
    const defaultImage = validasiPhotoUrl.getAttribute('src');
    validasiPhotoUrl.setAttribute('src', defaultImage);
  },

  _formatDate(dateString) {
    const options = {
      year: 'numeric',
      month: 'long',
      weekday: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  },

  _templateBodyTable(index, listStoryRecord) {
    return `
    <div class="col-md-4">
    <div class="card mb-3 bg-red text-white">
      <img src="${listStoryRecord.photoUrl}" class="card-img-top" alt="${
        listStoryRecord.name
      }" id="imgCard">
      <div class="card-body col-md-12">
        <h5 class="card-title" id="titleCard">${listStoryRecord.name}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary" id="dateCard">${this._formatDate(
          listStoryRecord.createdAt,
        )}</h6>
        <a href="#" class="card-link text-decoration-none lihat-lengkap text-white btn-c" data-bs-toggle="modal"
        data-bs-target="#lihatLengkapModal" data-record-id="${
          listStoryRecord.id
        }" id="idLihatLengkap">Lihat Detail</a>
        ${this._tombolEdit(listStoryRecord.id)}
        ${this._tombolHapus(listStoryRecord.id)}
      </div>
    </div>
  </div>
    `;
  },

  _tombolEdit(recordId) {
    if (this._dataAdaDiPenyimpananLokal(recordId)) {
      return `
      <a href="#" class="card-link text-decoration-none edit-story text-white btn-c" data-bs-toggle="modal" data-bs-target="#editModal" data-record-id="${recordId}">Edit Story</a>
      `;
    }
    return '';
  },

  _tombolHapus(recordId) {
    if (this._dataAdaDiPenyimpananLokal(recordId)) {
      return `
      <a href="#" class="card-link text-decoration-none delete-story text-white btn-c" data-bs-toggle="modal" data-bs-target="#deleteModal" data-record-id="${recordId}">Hapus Story</a>
      `;
    }
    return '';
  },

  _dataAdaDiPenyimpananLokal(recordId) {
    const dataSimpanStoryJSON = localStorage.getItem('dataSimpanStory');
    if (dataSimpanStoryJSON) {
      const dataSimpanStory = JSON.parse(dataSimpanStoryJSON);

      if (Array.isArray(dataSimpanStory)) {
        return dataSimpanStory.some((listStory) => listStory.id === recordId);
      }
    }
    return false;
  },

  _hapusDataDariLocalStorage(recordId) {
    const dataSimpanStoryJSON = localStorage.getItem('dataSimpanStory');
    if (dataSimpanStoryJSON) {
      const dataSimpanStory = JSON.parse(dataSimpanStoryJSON);
      const newDataSimpanStory = dataSimpanStory.filter((listStory) => listStory.id !== recordId);
      localStorage.setItem('dataSimpanStory', JSON.stringify(newDataSimpanStory));

      this._initialData();
    }
  },

  _simpanPerubahanDataDariLocalStorage(editedRecord) {
    const dataSimpanStoryJSON = localStorage.getItem('dataSimpanStory');
    if (dataSimpanStoryJSON) {
      const dataSimpanStory = JSON.parse(dataSimpanStoryJSON);

      const index = dataSimpanStory.findIndex((story) => story.id === editedRecord.id);
      if (index !== -1) {
        dataSimpanStory[index] = editedRecord;
        localStorage.setItem('dataSimpanStory', JSON.stringify(dataSimpanStory));
        this._initialData();
      }
    }
  },

  _templateEmptyBodyTable() {
    return `
    <div class="col-12">
    <p class="text-center">Belum ada story yang tersedia</p>
    </div>
    `;
  },
};

export default Dashboard;
