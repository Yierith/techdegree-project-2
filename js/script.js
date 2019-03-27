/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


// Global constants
const pageDiv = document.querySelector('.page');
const pageHeader = document.querySelector('.page-header');
const studentUl = document.querySelector('.student-list');
const studentList = studentUl.children;
const studentsPerPage = 10;



// Function to show needed Students for a specific page
const showPage = (list, page) => {
  // First and Last Student on Page
  const firstStudentOfPage = ( page * studentsPerPage ) - 10;
  const lastStudentOfPage = ( page * studentsPerPage ) - 1;

  // Looping through the list parameter to display and hide Students
  for ( let i = 0; i < list.length; i++ ){
    if ( i >= firstStudentOfPage && i <= lastStudentOfPage ){
      list[i].style.display = '';
    } else {
      list[i].style.display = 'none';
    }
  }
};

// Function to create an Element, for DRY purposes.
const createElement = (elementName, property, value) => {
  const element = document.createElement(elementName);
  element[property] = value;
  return element;
};


// Appending pagination to the links
const appendPageLinks = ( list ) => {
  // Calculate the number of pages needed
  const numberOfPages = Math.ceil( list.length / studentsPerPage );
  // Creating the pagination Div
  const paginationDiv = createElement('div', 'className', 'pagination');
  pageDiv.appendChild(paginationDiv);
  const paginationUl = document.createElement('ul');
  paginationDiv.appendChild(paginationUl);
  // Looping over the number of pages and filling the pagination with links
  for ( let i = 0; i < numberOfPages; i++ ){
    const paginationLi = document.createElement('li');
    paginationUl.appendChild(paginationLi);
    const paginationLink = createElement('a', 'href', '#');
    paginationLink.textContent = i + 1;
    paginationLi.appendChild(paginationLink);
    // Set the first page link to active when entering the page
    if ( i === 0 ){
      paginationLink.className = 'active';
    }
    // Eventlistener to monitor clicks onto the pagination links
    paginationLink.addEventListener('click', (e) => {
      if ( e.target.tagName === 'A' ){
        const paginationLinks = document.querySelectorAll('a');
        // Removing the active class from all of the links
        for ( let j = 0; j < paginationLinks.length; j++ ){
          paginationLinks[j].classList.remove('active');
        }
        // Showing the page.
        showPage(studentList, e.target.textContent);
        // Adding the active class to the clicked link
        e.target.className = 'active';
      }
    });
  }
};

// Removing links from page
const removeLinks = () => {
  const links = document.querySelector('.pagination');
  links.parentNode.removeChild(links);
};

// Building an error message if no student was found and appending it to the page
const errorMessage = () => {
  const error = createElement('h2', 'className', 'error')
  error.textContent = 'Sorry, no Student found with that name';
  pageDiv.appendChild(error);
};

// Filter the students based on the input entered into the search bar
const filter = (input) => {
  const students = document.querySelectorAll('h3');
  const foundStudents = [];

  const removeErrorMessage = () => {
		const getError = document.querySelector('.error');
		if (getError) {
			pageDiv.removeChild(getError);
		}
	};
  removeErrorMessage();
  // Looping over the students to hide all who dont include the entered Search input value
  for ( let i = 0; i < students.length; i++ ) {
    const student = students[i].textContent;
    students[i].parentNode.parentNode.style.display = 'none';
    // Showing all students which names include the lower cased search input value
    if ( student.includes(input.toLowerCase()) ){
      students[i].parentNode.parentNode.style.display = '';
      // Adding found students to a list know which should be shown based on the search string
      foundStudents.push(student);
    }
  }
  // Creating an error message when no student found with the entered search string
  if ( foundStudents.length <= 0 ){
    errorMessage();
  }
  // Removing pagination links
  removeLinks();
  // Showing the new page with the found students
  appendPageLinks(foundStudents);
};

// Adding Searchbar and Searchbutton to the page
const studentSearch = () => {
  const studentSearchDiv = createElement('div', 'className', 'student-search');
  pageHeader.appendChild(studentSearchDiv);

  const searchInputField = createElement('input', 'placeholder', 'Search for students...');
  studentSearchDiv.appendChild(searchInputField);

  const searchButton = createElement('button', 'textContent', 'Search');
  studentSearchDiv.appendChild(searchButton);
  // Realtime filtering for every letter entered into the search Field
  searchInputField.addEventListener('keyup', (e) => {
    const input = e.target.value;
    filter(input);
  });
  // Filter functionality for the search button
  searchButton.addEventListener('click', (e) => {
    const input = searchInputField.value;
    filter(input);
  });
};

studentSearch();
showPage(studentList, 1);
appendPageLinks(studentList);
