console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let pages = [
  {url: 'https://juseotin.github.io/portfolio/', title: 'Home'},
  {url: 'contact/', title: 'Contact'},
  {url: 'projects/', title: 'Projects'},
  {url: 'resume/', title: 'CV/Resume'},
  {url: 'https://github.com/juseotin', title: 'Github'}
];

const ARE_WE_HOME = document.documentElement.classList.contains('home');


let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
  let url = p.url;
  let title = p.title;
  
  url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url: url;
  
  let a = document.createElement('a');
  a.href = url;
  a.textContent = title;

  a.classList.toggle(
      'current',
      a.host === location.host && a.pathname === location.pathname
    );
    
  a.toggleAttribute("target", a.host!==location.host);
  a.target = a.host !== location.host? "_blank" : "";

  nav.append(a);
}


document.body.insertAdjacentHTML(
  'afterbegin',
  `
    <label class="color-scheme">
        Theme:
        <select>
          <option value= "light dark">Automatic</option>
          <option value = "light">Light</option>
          <option value = "dark">Dark</option>
        </select>
    </label>`
);

const select = document.querySelector(".color-scheme select");

if ("colorScheme" in localStorage) {
    const savedScheme = localStorage.colorScheme;
    document.documentElement.style.setProperty("color-scheme", savedScheme);
    const select = document.querySelector('.color-scheme select');
    select.value = savedScheme;
  }


select.addEventListener("input", (e) => {
    console.log("Color scheme changed to:", e.target.value);
    document.documentElement.style.setProperty("color-scheme", e.target.value);
    localStorage.colorScheme = e.target.value;
  });

const form = document.querySelector("form");
form?.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    let url = form.action + "?";

    for (let [name, value] of data) {
        value = encodeURIComponent(value);
        url += `${name}=${value}&`;
        console.log(name, value);
      }

      url = url.slice(0, -1);
      location.href = url;
});