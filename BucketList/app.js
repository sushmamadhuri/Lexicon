// Initialize an empty array to store activities
let activities = [];

// Select necessary DOM elements
const bucketForm = document.getElementById("bucketForm");
const activityNameInput = document.getElementById("activityName");
const activityCategorySelect = document.getElementById("activityCategory");
const bucketLists = document.getElementById("bucketLists");

// Function to render the bucket list
function renderBucketList() {
  // Clear the current list in the DOM
  bucketLists.innerHTML = "";

  // Group activities by category
  const groupedActivities = activities.reduce((groups, activity) => {
    const { category } = activity;
    console.log("groupsabove :",  groups);
    //console.log("activity :",  activity);
    if (!groups[category]) {
      groups[category] = [];
     // console.log("groups[category]  ", groups[category]);
      
    }
    groups[category].push(activity);
    console.log("final group:" , groups);
    
    return groups;
  }, {});

  // Create a section for each category
  for (const category in groupedActivities) {
    const categoryDiv = document.createElement("div");
    const categoryHeader = document.createElement("h3");
    categoryHeader.textContent = category;
    categoryDiv.appendChild(categoryHeader);

    const ul = document.createElement("ul");

    groupedActivities[category].forEach((activity, index) => {
      const li = document.createElement("li");

      // Display activity name
      const span = document.createElement("span");
      span.textContent = activity.name;
      if (activity.completed) {
        span.classList.add("completed");
        console.log("activity.completed" , activity.completed);
        
      }
      li.appendChild(span);

      // Add complete button
      const completeBtn = document.createElement("button");
      completeBtn.textContent = "✓";
      completeBtn.classList.add("complete-btn");
      completeBtn.addEventListener("click", () => {
        activity.completed = !activity.completed; // Toggle completion
        renderBucketList();
      });
      li.appendChild(completeBtn);

      // Add remove button
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "X";
      removeBtn.classList.add("remove-btn");
      removeBtn.addEventListener("click", () => {
        activities.splice(index, 1); // Remove activity from array
        renderBucketList();
      });
      li.appendChild(removeBtn);

      ul.appendChild(li);
    });

    categoryDiv.appendChild(ul);
    bucketLists.appendChild(categoryDiv);
  }
}

// Handle form submission
bucketForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const activityName = activityNameInput.value.trim();
  const activityCategory = activityCategorySelect.value;

  if (activityName) {
    // Add the new activity as an object
    activities.push({
      name: activityName,
      category: activityCategory,
      completed: false,
    });

    // Clear input fields
    activityNameInput.value = "";
    activityCategorySelect.selectedIndex = 0;
localStorage.setItem("name", "sushma");
    // Re-render the list
    renderBucketList();
  }
});

// Initial render
renderBucketList();
