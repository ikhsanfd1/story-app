// Import our custom CSS
import '../sass/main.scss';

// Import components
import './components/index';

// Import javascript file as needed
import * as bootstrap from 'bootstrap';
import Dashboard from './pages/dashboard';
import Add from './pages/story/add';
import Login from './pages/auth/login';

const routes = {
  '/': Dashboard,
  '/story/add.html': Add,
  '/auth/login.html': Login,
};

const detectRoute = () => routes[window.location.pathname];

const initPages = () => {
  const header = document.querySelector('header');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');

  if (header && main && footer) {
    main.style.minHeight = `calc(100vh - ${header.clientHeight + footer.clientHeight}px)`;
  }

  document.addEventListener('scroll', (e) => {
    if (window.scrollY > 0) {
      header.querySelector('nav-app').classList.add('scrolled');
    } else {
      header.querySelector('nav-app').classList.remove('scrolled');
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.querySelector('back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTop.style.display = 'block';
      } else {
        backToTop.style.display = 'none';
      }
    });

    backToTop.addEventListener('click', () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  initPages();

  const route = detectRoute();
  route.init();
});
