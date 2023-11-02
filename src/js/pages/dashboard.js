import CheckUserAuth from './auth/check-user-auth';
import Stories from '../network/stories';

const Dashboard = {
  async init() {
    this._showSpinnerAndcardPlaceholder();

    CheckUserAuth.checkLoginState();

    await this._initialData();
    this._initialListener();
  },

  async _initialData() {
    try {
      const response = await Stories.getAll();
      const responseRecords = response.data.listStory;

      this._userListStory = responseRecords;

      this._userListStory.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });

      setTimeout(() => {
        this._hideSpinnerAndcardPlaceholder();
      }, 3000);

      this._populateListStoryRecordToCard(this._userListStory);
    } catch (error) {
      console.error(error);

      this._hideSpinnerAndcardPlaceholder();
    }
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
        }
        editModal.classList.remove('show');
        editModal.style.display = 'none';
        document.body.classList.remove('modal-open');
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
          modalBackdrop.remove();
        }
        const successAlert = document.querySelector('#successEditAlert');
        successAlert.classList.remove('d-none');
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
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
        this._hapusDataDariList(recordId);
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
        console.log(editedRecord);
      }

      const editModal = document.getElementById('editModal');
      if (editModal) {
        editModal.classList.remove('show');
        editModal.style.display = 'none';
      }
      document.body.classList.remove('modal-open');
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    });
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
      }" id="imgCard" style="width: 100%; height: 200px;">
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
    if (this._dataAdaDiList(recordId)) {
      return `
      <a href="#" class="card-link text-decoration-none edit-story text-white btn-c" data-bs-toggle="modal" data-bs-target="#editModal" data-record-id="${recordId}">Edit Story</a>
      `;
    }
    return '';
  },

  _tombolHapus(recordId) {
    if (this._dataAdaDiList(recordId)) {
      return `
      <a href="#" class="card-link text-decoration-none delete-story text-white btn-c" data-bs-toggle="modal" data-bs-target="#deleteModal" data-record-id="${recordId}">Hapus Story</a>
      `;
    }
    return '';
  },

  _dataAdaDiList(recordId) {
    return this._userListStory.some((listStory) => listStory.id === recordId);
  },

  _hapusDataDariList(recordId) {
    this._userListStory = this._userListStory.filter((listStory) => listStory.id !== recordId);
    this._populateListStoryRecordToCard(this._userListStory);
  },

  _templateEmptyBodyTable() {
    return `
    <div class="col-12">
    <p class="text-center">Belum ada story yang tersedia</p>
    </div>
    `;
  },

  _showSpinnerAndcardPlaceholder() {
    const spinnersLoad = document.getElementById('spinnersLoad');
    const cardPlaceholder1 = document.getElementById('cardPlaceholder1');
    const cardPlaceholder2 = document.getElementById('cardPlaceholder2');
    if (spinnersLoad && cardPlaceholder1 && cardPlaceholder2) {
      spinnersLoad.removeAttribute('hidden');
      cardPlaceholder1.removeAttribute('hidden');
      cardPlaceholder2.removeAttribute('hidden');
    }
  },

  _hideSpinnerAndcardPlaceholder() {
    const spinnersLoad = document.getElementById('spinnersLoad');
    const cardPlaceholder1 = document.getElementById('cardPlaceholder1');
    const cardPlaceholder2 = document.getElementById('cardPlaceholder2');

    if (spinnersLoad && cardPlaceholder1 && cardPlaceholder2) {
      spinnersLoad.setAttribute('hidden', '');
      cardPlaceholder1.setAttribute('hidden', '');
      cardPlaceholder2.setAttribute('hidden', '');
    }
  },
};

export default Dashboard;
