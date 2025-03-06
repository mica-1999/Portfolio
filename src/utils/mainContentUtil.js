// GETS THE BADGE COLOR AND OUTPUT TEXT FOR THE STATE OF THE PROJECT
export function getBadgeClass(state) {
    switch (state) {
      case 0:
        return { badgeColor: 'danger', output: 'Failed' };
      case 1:
        return { badgeColor: 'success', output: 'Completed' };
      case 2:
        return { badgeColor: 'warning', output: 'In Progress' };
      case 3:
        return { badgeColor: 'secondary', output: 'Not Started' };
      default:
        return { badgeColor: 'default', output: 'default' };
    }
};

export function getActiveColor(status){
  switch(status){
    case 'active': 
    return { colorActive: 'success' };
    case 'inactive': 
      return { colorActive: 'danger' };
    case 'pending': 
      return { colorActive: 'warning' };
    case 'suspended': 
      return { colorActive: 'secondary' };
    default: 
      return { colorActive: 'default' };
  }
}

// GETS THE EVENT COLOR BASED ON THE STATUS
export function getEventColor(status) {
  switch (status.toLowerCase()) {
    case 'planned':
      return 'primary';
    case 'in progress':
      return 'success';
    case 'delayed':
      return 'warning';
    case 'on hold':
      return 'secondary';
    case 'completed':
      return 'success';
    case 'cancelled':
      return 'danger';
    case 'failed':
      return 'danger';
    case 'under review':
      return 'info';
    case 'awaiting approval':
      return 'info';
    case 'archived':
      return 'secondary';
    default:
      return 'secondary'; // Default if status is unknown
  }
};

// GETS THE ROLE BADGE COLOR AND OUTPUT TEXT OF THE USERS
export function getRoleClass(role) {
  switch (role) {
    case 'admin':
    case 'Admin':
      return { badgeColor: 'vip-crown', output: 'Admin', color: 'primary' };
    case 'viewer':
    case 'Viewer':
      return { badgeColor: 'user', output: 'Viewer', color: 'success' };
    case 'editor':
    case 'Editor':
      return { badgeColor: 'edit-box', output: 'Editor', color: 'warning' };
    case 'author':
    case 'Author':
      return { badgeColor: 'computer', output: 'Author', color: 'danger' };
    default:
      return { badgeColor: 'default', output: 'default', color: 'default' };
  }
};


// FORMATS THE NUMBER IF IT IS GREATER THAN 10000
export function formatNumber(num) {
    if (num >= 10000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num;
}

// GETS THE TIME DIFFERENCE BETWEEN THE CURRENT TIME AND THE EVENT TIME FOR THE TIMELINE
export function getTimeFormatted(time)  {
  if (!time) return 'Invalid time';


  const currentTime = new Date(); // Current time
  const eventTime = new Date(time); // Timeline time
  const diffMs = currentTime - eventTime; // Difference in milliseconds

  // Convert difference to seconds, minutes, hours, and days
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  // Generate the formatted string
  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else if (diffHours > 0) {
    const remainingMinutes = diffMinutes % 60;
    return `${diffHours}h ${remainingMinutes}min ago`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} min ago`;
  } else {
    return `${diffSeconds} sec ago`;
  }
};

export function getTagColor(tag) {
  switch (tag) {
    case 'HTML': return { color: 'blue', tag: 'HTML' };
    case 'CSS': return { color: 'purple', tag: 'CSS' };
    case 'Javascript': return { color: 'yellow', tag: 'Javascript' };
    case 'PHP': return { color: 'red', tag: 'PHP' };
    case 'Python': return { color: 'green', tag: 'Python' };
    case 'Java': return { color: 'green', tag: 'Java' };
    case 'C++': return { color: 'black', tag: 'C++' };
    case 'C#': return { color: 'gray', tag: 'C#' };
    case 'Ruby': return { color: 'red', tag: 'Ruby' };
    case 'React': return { color: 'blue', tag: 'React' };
    case 'Angular': return { color: 'orange', tag: 'Angular' };
    case 'Node.js': return { color: 'green', tag: 'Node.js' };
    case 'Express': return { color: 'gray', tag: 'Express' };
    case 'MongoDB': return { color: 'green', tag: 'MongoDB' };
    case 'Vue.js': return { color: 'green', tag: 'Vue.js' };
    case 'Firebase': return { color: 'orange', tag: 'Firebase' };
    case 'Tailwind CSS': return { color: 'cyan', tag: 'Tailwind CSS' };
    case 'Next.js': return { color: 'black', tag: 'Next.js' };
    case 'Bootstrap': return { color: 'blue', tag: 'Bootstrap' };
    case 'API': return { color: 'cyan', tag: 'API' };
    case 'Socket.IO': return { color: 'black', tag: 'Socket.io' };
    case 'Material UI': return { color: 'blue', tag: 'Material UI' };
    default: return { color: 'gray', tag: 'default' };
  }
}

export function filterByTimeRange(lastActive, timeRange) {
  const currentTime = new Date();
  let startTime;

  switch (timeRange) {
    case "Last 7 days":
      startTime = new Date(currentTime.setDate(currentTime.getDate() - 7));
      break;
    case "Last 30 days":
      startTime = new Date(currentTime.setMonth(currentTime.getMonth() - 1));
      break;
    case "Last 6 months":
      startTime = new Date(currentTime.setMonth(currentTime.getMonth() - 6));
      break;
    case "Last year":
      startTime = new Date(currentTime.setFullYear(currentTime.getFullYear() - 1));
      break;
    case "All time":
    default:
      return true; // No filtering for "All time"
  }

  return new Date(lastActive) >= startTime;
}
