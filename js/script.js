/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/***
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.

   But be mindful of which variables should be global and which
   should be locally scoped to one of the two main functions you're
   going to create. A good general rule of thumb is if the variable
   will only be used inside of a function, then it can be locally
   scoped to that function.
***/
const pageDiv = document.querySelector('.page');
const pageHeader = document.querySelector('.page-header');
const studentUl = document.querySelector('.student-list');
const studentList = studentUl.children;
const studentsPerPage = 10;


/***
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.

   Pro Tips:
     - Keep in mind that with a list of 54 students, the last page
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function
***/
const showPage = (list, page) => {
  const firstStudentOfPage = ( page * studentsPerPage ) - 10;
  const lastStudentOfPage = ( page * studentsPerPage ) - 1;
  //console.log(firstStudentOfPage);
  //console.log(lastStudentOfPage);

  for ( let i = 0; i < list.length; i++ ){
    if ( i >= firstStudentOfPage && i <= lastStudentOfPage ){
      list[i].style.display = '';
    } else {
      list[i].style.display = 'none';
    }
  }
};

const createElement = (elementName, property, value) => {
  const element = document.createElement(elementName);
  element[property] = value;
  return element;
};

/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/
const appendPageLinks = ( list ) => {
  const numberOfPages = Math.ceil( list.length / studentsPerPage );
  const paginationDiv = createElement('div', 'className', 'pagination');
  pageDiv.appendChild(paginationDiv);
  const paginationUl = document.createElement('ul');
  paginationDiv.appendChild(paginationUl);

  for ( let i = 0; i < numberOfPages; i++ ){
    const paginationLi = document.createElement('li');
    paginationUl.appendChild(paginationLi);
    const paginationLink = createElement('a', 'href', '#');
    paginationLink.textContent = i + 1;
    paginationLi.appendChild(paginationLink);
    if ( i === 0 ){
      paginationLink.className = 'active';
    }
    paginationLink.addEventListener('click', (e) => {
      if ( e.target.tagName === 'A' ){
        const paginationLinks = document.querySelectorAll('a');
        //console.log(paginationLinks);
        for ( let j = 0; j < paginationLinks.length; j++ ){
          paginationLinks[j].classList.remove('active');
        }
        showPage(studentList, e.target.textContent);
        e.target.className = 'active';
      }
    });
  }
};

const removeLinks = () => {
  const links = document.querySelector('.pagination');
  links.parentNode.removeChild(links);
};

const errorMessage = () => {
  const error = createElement('h2', 'className', 'error')
  error.textContent = 'No Student found with that name';
  pageDiv.appendChild(error);
};

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
  for ( let i = 0; i < students.length; i++ ) {
    const student = students[i].textContent;
    console.log(students[i].parentNode);
    students[i].parentNode.parentNode.style.display = 'none';
    if ( student.includes(input) ){
      students[i].parentNode.parentNode.style.display = '';
      foundStudents.push(student);
    }
  }
  if ( foundStudents.length <= 0 ){
    errorMessage();
  }
  removeLinks();
  appendPageLinks(foundStudents);
};


const studentSearch = () => {
  const studentSearchDiv = createElement('div', 'className', 'student-search');
  pageHeader.appendChild(studentSearchDiv);

  const searchInputField = createElement('input', 'placeholder', 'Search for students...');
  studentSearchDiv.appendChild(searchInputField);

  const searchButton = createElement('button', 'textContent', 'Search');
  studentSearchDiv.appendChild(searchButton);

  searchInputField.addEventListener('keyup', (e) => {
    const input = e.target.value;
    filter(input);
  });
};


studentSearch();
showPage(studentList, 1);
appendPageLinks(studentList);
// Remember to delete the comments that came with this file, and replace them with your own code comments.
