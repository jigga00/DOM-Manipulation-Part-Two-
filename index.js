import './style.css';

//Menu data structure
const menuLinks = [
  { text: 'about', href: '/about' },
  {
    text: 'catalog',
    href: '#',
    subLinks: [
      { text: 'all', href: '/catalog/all' },
      { text: 'top selling', href: '/catalog/top' },
      { text: 'search', href: '/catalog/search' },
    ],
  },
  {
    text: 'orders',
    href: '#',
    subLinks: [
      { text: 'new', href: '/orders/new' },
      { text: 'pending', href: '/orders/pending' },
      { text: 'history', href: '/orders/history' },
    ],
  },
  {
    text: 'account',
    href: '#',
    subLinks: [
      { text: 'profile', href: '/account/profile' },
      { text: 'sign out', href: '/account/signout' },
    ],
  },
];

const mainEl = document.querySelector('main');
mainEl.style.backgroundColor = 'var(--main-bg)';
mainEl.innerHTML = '<h1>DOM Manipulation</h1>';
mainEl.classList.add('flex-ctr');

const topMenuEl = document.getElementById('top-menu');
topMenuEl.style.height = '100%';
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
topMenuEl.classList.add('flex-around');

menuLinks.forEach(link => {
  const aLinks = document.createElement('a');
  aLinks.href = link.href;
  aLinks.textContent = link.text;
  topMenuEl.appendChild(aLinks);
});

// Part 1: Formatting the submenu
const subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.classList.add("flex-around");


// Part 3: Adding Menu Interaction
const topMenuLinks = topMenuEl.querySelectorAll("a");

topMenuEl.addEventListener("click", function(event) {
  event.preventDefault();
  
  if (!event.target.matches("a")) {
    return;
  }
  
  console.log(event.target.textContent);
  
  topMenuLinks.forEach(function(link) {
    link.classList.remove("active");
  });
  
  event.target.classList.add("active");
});

// Part 4: Adding Submenu Interaction
topMenuEl.addEventListener("click", function(event) {
  event.preventDefault();
  
  if (!event.target.matches("a")) {
    return;
  }
  
  if (!event.target.classList.contains("active")) {
    if (menuLinks[event.target.dataset.index].subLinks) {
      subMenuEl.style.top = "100%";
    } else {
      subMenuEl.style.top = "0";
    }
    
    buildSubmenu(menuLinks[event.target.dataset.index].subLinks);
  } else {
    subMenuEl.style.top = "0";
  }
});

// Part 5: Building the Submenu
function buildSubmenu(subLinks, subMenuEl) {
  // Clear the current contents of subMenuEl
  subMenuEl.innerHTML = '';

  // Iterate over the subLinks array
  subLinks.forEach(link => {
    // Create an <a> element
    const linkElement = document.createElement('a');

    // Add an href attribute to the <a>
    linkElement.setAttribute('href', link.href);

    // Set the element's content to the value of the text property
    linkElement.textContent = link.text;

    // Append the new element to the subMenuEl
    subMenuEl.appendChild(linkElement);
  });
}

const subLinks = [
  { href: '', text: 'NEW' },
  { href: '', text: 'PENDING' },
  { href: '', text: 'HISTORY' }
];

buildSubmenu(subLinks, subMenuEl);

// Part 6: Adding Submenu Item Interaction
subMenuEl.addEventListener("click", function(event) {
  event.preventDefault();
  
  if (!event.target.matches("a")) {
    return;
  }
  
  subMenuEl.style.top = "0";
  
  topMenuLinks.forEach(function(link) {
    link.classList.remove("active");
  });
  
  mainEl.innerHTML = "<h1>" + event.target.textContent + "</h1>";
});