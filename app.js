const header = document.querySelector('h1'); // select h1 element which is a header text
const app = document.getElementById('app'); // select element with id app which is main container
const ddMenu = document.querySelector('#ddMenu'); // select element with ddMenu id for drop down menu
const sandwitch = document.querySelectorAll('svg'); // select all elements with tag <svg>
const html = document.documentElement; // get the <html>

const menuItems = ['Calculator', 'About', 'Contact']; // Array of menu items

// toggle dark mode theme
const toggleTheme = () => {
  const html = document.documentElement;
  html.classList.toggle('dark');
  renderThemeToggle();
};

// set the current view based on which button was clicked: 'Calculator', 'About', 'Contact'
const setView = (v) => {
  header.innerText = v;
  toggleMenu(true);

  if (v === 'Calculator') {
    renderCalculator();
  } else if (v === 'About') {
    renderAbout();
  } else if (v === 'Contact') {
    renderContact();
  }
};

// function to toggle drop down menu visibility
const toggleMenu = (hide) => {
  if (!hide) {
    ddMenu.classList.toggle('hidden');
    document.querySelectorAll('svg').forEach((el) => {
      el.classList.toggle('hidden');
    });
  } else {
    ddMenu.classList.add('hidden');
    document.querySelectorAll('svg')[0].classList.remove('hidden');
    document.querySelectorAll('svg')[1].classList.add('hidden');
  }
};

// function to add a row to the container
const addRow = (container, content) => {
  const row = `<div class='grid grid-cols-5 gap-2'>${content}</div>`;
  container.insertAdjacentHTML('beforeend', row);
};

// function to add a monitor to the calculator
const addMonitor = (container, text) => {
  const t = text ?? '';
  const monitor = `<div id='monitor' class="bg-white border-4 border-blue-400 h-20 flex items-center col-span-5 text-blue-800 p-2 rounded-lg mb-2 font-bold text-4xl">${t}</div>`;
  container.insertAdjacentHTML('beforeend', monitor);
};

// function to create a button
const button = (text) => {
  const c = text === 'calculate' ? 'col-span-4' : '';
  return `<div class='bg-blue-400 hover:bg-blue-600 text-white ${c} py-1 rounded-md text-center text-lg font-bold cursor-pointer d-btn'>${text}</div>`;
};

// function to add a button to the claculator
const addButtons = (container, nums) => {
  const btnHTML = nums.map((n) => button(n)).join('');
  addRow(container, btnHTML);
};

// function that handles clicks on the calculator
const click = (event) => {
  const monitor = document.getElementById('monitor');
  const bac = monitor.innerText.trim();
  const a = event.target.innerText;
  console.log(a);
  if (a === 'clear') {
    monitor.innerText = '';
  } else if (a === 'calculate') {
    monitor.innerText = bac + '=' + eval(bac);
  } else {
    monitor.innerText += a;
  }
};

// function to create the calculator and render it (show it)
const renderCalculator = () => {
  const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '**', 'calculate', 'clear'];
  app.innerHTML = '';
  addMonitor(app);
  addButtons(app, labels);
  const buttons = document.querySelectorAll('.d-btn');
  buttons.forEach((el) => el.addEventListener('click', click));
};

// function to show the about "page"
const renderAbout = () => {
  app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for About</div>';
};

// fucntion to show the contact "page"
const renderContact = () => {
  app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for Contact</div>';
};

const renderMenu = () => {
  const menuContainer = document.querySelector('.justify-start');
  const ddMenuContainer = document.getElementById('ddMenu');

  const menuHTML = menuItems.map((item) => `<button onclick="setView('${item}')">${item}</button>`).join('');
  menuContainer.innerHTML = menuHTML;

  const ddMenuHTML = menuItems
    .map((item) => `<button class="block py-1 px-2" onclick="setView('${item}')">${item}</button>`)
    .join('');
  ddMenuContainer.innerHTML = ddMenuHTML;
};

// function to render theme toggle buttons dynamically
const renderThemeToggle = () => {
  const themeToggleContainer = document.querySelector('#menu > div:last-child');
  if (!themeToggleContainer) {
    console.error('No element found for theme toggle container');
    return;
  }
  const themeHTML = `
    <button class="${html.classList.contains('dark') ? 'hidden' : 'block'}" onclick="toggleTheme()">
        Dark
    </button>
    <button class="${html.classList.contains('dark') ? 'block' : 'hidden'}" onclick="toggleTheme()">
        Light
    </button>
  `;

  themeToggleContainer.innerHTML = themeHTML;
};

renderMenu();
renderCalculator();
renderThemeToggle();
