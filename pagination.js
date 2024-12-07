let issues = []; // Array to store the fetched data
let currentPage = 1; // Current page number
let rowsPerPage = 10; // Number of rows per page

// Fetch data from JSON file
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        issues = data; // Store fetched data
        displayTable(issues, currentPage, rowsPerPage); // Display the first page
        setupPagination(issues, rowsPerPage); // Set up pagination controls
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to display the table
function displayTable(data, page, rowsPerPage) {
    const tableBody = document.querySelector('#issueTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const paginatedData = data.slice(startIndex, endIndex);

    paginatedData.forEach(issue => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td><a href="issue.html?case=${issue.CaseNumber}">${issue.CaseNumber}</a></td>
            <td>${issue.CustomerName}</td>
            <td>${issue.Email}</td>
            <td>${issue.Category}</td>
            <td>${issue.Description.substring(0, 50)}...</td>
            <td>${issue.Status}</td>
            <td>${issue.AssignedPerson}</td>`;
        
        tableBody.appendChild(row);
    });
}

// Function to set up pagination controls
function setupPagination(data, rowsPerPage) {
    const paginationControls = document.getElementById('paginationControls');
    paginationControls.innerHTML = ''; // Clear existing controls

    const totalPages = Math.ceil(data.length / rowsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        
        button.textContent = i;
        
        if (i === currentPage) button.classList.add('disabled');
        
        button.addEventListener('click', () => {
            currentPage = i; // Update current page
            displayTable(data, currentPage, rowsPerPage); // Display new page
            setupPagination(data, rowsPerPage); // Update controls
        });

        paginationControls.appendChild(button);
    }

    // Add Previous and Next buttons
    addNavigationButtons(paginationControls, totalPages);
}

// Function to add Previous and Next buttons
function addNavigationButtons(paginationControls, totalPages) {
    const prevButton = document.createElement('button');
    
    prevButton.textContent = 'Previous';
    
    prevButton.disabled = currentPage === 1;
    
    prevButton.classList.toggle('disabled', currentPage === 1);

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayTable(issues, currentPage, rowsPerPage);
            setupPagination(issues, rowsPerPage);
        }
    });

    const nextButton = document.createElement('button');
    
    nextButton.textContent = 'Next';
    
    nextButton.disabled = currentPage === totalPages;

    nextButton.classList.toggle('disabled', currentPage === totalPages);

    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayTable(issues, currentPage, rowsPerPage);
            setupPagination(issues, rowsPerPage);
        }
    });

    paginationControls.prepend(prevButton);
    
    paginationControls.append(nextButton);
}