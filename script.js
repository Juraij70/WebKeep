 // Update time every second
 function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('currentTime').textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateTime, 1000);
updateTime(); // Initial call to set time immediately

document.addEventListener('DOMContentLoaded', loadLinks);

function addLink() {
    const linkName = document.getElementById('linkName').value;
    const linkURL = document.getElementById('linkURL').value;
    
    if (linkName && linkURL) {
        const link = { name: linkName, url: linkURL };
        appendLinkToDOM(link);
        saveLink(link);

        document.getElementById('linkName').value = '';
        document.getElementById('linkURL').value = '';
    }
}

function appendLinkToDOM(link) {
    const newArticle = document.createElement('article');
    newArticle.className = 'item';

    const newParagraph = document.createElement('p');
    newParagraph.className = 'dessert';

    const newAnchor = document.createElement('a');
    newAnchor.href = link.url;
    newAnchor.textContent = link.name;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function() { editLink(editButton); };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() { deleteLink(deleteButton); };

    newParagraph.appendChild(newAnchor);
    newParagraph.appendChild(editButton);
    newParagraph.appendChild(deleteButton);
    newArticle.appendChild(newParagraph);

    document.getElementById('linkSection').appendChild(newArticle);
}

function saveLink(link) {
    const links = getLinks();
    links.push(link);
    localStorage.setItem('links', JSON.stringify(links));
}

function getLinks() {
    const links = localStorage.getItem('links');
    return links ? JSON.parse(links) : [];
}

function loadLinks() {
    const links = getLinks();
    links.forEach(link => appendLinkToDOM(link));
}

function editLink(button) {
    const linkElement = button.parentElement.querySelector('a');
    const linkName = linkElement.textContent;
    const linkURL = linkElement.href;

    const linkNameInput = document.createElement('input');
    linkNameInput.type = 'text';
    linkNameInput.value = linkName;
    linkNameInput.style.marginRight = '10px';

    const linkURLInput = document.createElement('input');
    linkURLInput.type = 'text';
    linkURLInput.value = linkURL;

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.onclick = function() {
        linkElement.textContent = linkNameInput.value;
        linkElement.href = linkURLInput.value;
        updateLink(linkName, linkURL, linkNameInput.value, linkURLInput.value);

        button.style.display = '';
        saveButton.remove();
        linkNameInput.remove();
        linkURLInput.remove();
    };

    button.parentElement.insertBefore(linkNameInput, linkElement);
    button.parentElement.insertBefore(linkURLInput, linkElement.nextSibling);
    button.parentElement.insertBefore(saveButton, button);

    button.style.display = 'none';
}

function updateLink(oldName, oldURL, newName, newURL) {
    const links = getLinks();
    const linkIndex = links.findIndex(link => link.name === oldName && link.url === oldURL);
    if (linkIndex !== -1) {
        links[linkIndex] = { name: newName, url: newURL };
        localStorage.setItem('links', JSON.stringify(links));
    }
}

function deleteLink(button) {
    const article = button.parentElement.parentElement;
    const linkElement = article.querySelector('a');
    const linkName = linkElement.textContent;
    const linkURL = linkElement.href;
    article.remove();
    removeLink(linkName, linkURL);
}

function removeLink(name, url) {
    const links = getLinks();
    const updatedLinks = links.filter(link => link.name !== name || link.url !== url);
    localStorage.setItem('links', JSON.stringify(updatedLinks));
}

function deleteAllLinks() {
    document.getElementById('linkSection').innerHTML = '';
    localStorage.removeItem('links');
}