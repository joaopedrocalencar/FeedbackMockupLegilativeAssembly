async function fetchData() {
    const usersResponse = fetch('https://jsonplaceholder.typicode.com/users');
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const [users, posts] = await Promise.all([usersResponse, postsResponse]).then(responses => 
        Promise.all(responses.map(res => res.json()))
    );

    displayFeedback(users, posts);
}

function displayFeedback(users, posts) {
    const feedbackList = document.getElementById('feedbackList');
    feedbackList.innerHTML = ''; // Clear existing feedback

    users.forEach(user => {
        const userPost = posts.find(post => post.userId === user.id);
        const div = document.createElement('div');
        div.innerHTML = `<strong>${user.name}</strong><p>Feedback: ${userPost ? userPost.body : 'No feedback provided.'}</p>`;
        feedbackList.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', fetchData);

document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission
    const userName = document.getElementById('userName').value;
    const userFeedback = document.getElementById('userFeedback').value;
    submitFeedback(userName, userFeedback);
});


function submitFeedback(userName, userFeedback) {
    const feedbackList = document.getElementById('feedbackList');
    const div = document.createElement('div');
    div.innerHTML = `<strong>${userName}</strong><p>Feedback: ${userFeedback}</p>`;
    
    // Prepend the new feedback to the list, making it appear at the top
    feedbackList.prepend(div);

    // Clear the form fields after submission
    document.getElementById('userName').value = '';
    document.getElementById('userFeedback').value = '';
}

