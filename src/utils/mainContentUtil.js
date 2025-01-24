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

// GETS THE ROLE BADGE COLOR AND OUTPUT TEXT OF THE USERS
export function getRoleClass(role) {
    switch (role) {
      case 'admin':
        return { badgeColor: 'vip-crown', output: 'Admin', color: 'primary' };
      case 'viewer':
        return { badgeColor: 'user', output: 'Viewer', color: 'success' };
      case 'editor':
        return { badgeColor: 'edit-box', output: 'Editor' , color: 'warning'};
      case 'author':
        return { badgeColor: 'computer', output: 'Author' , color: 'danger'};
      default:
        return { badgeColor: 'default', output: 'default' , color: 'default'};
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
    case 'HTML':
      return 'primary'; // var(--bs-primary)
    case 'CSS':
      return 'secondary'; // var(--bs-secondary)
    case 'Javascript':
      return 'yellow'; // var(--bs-yellow)
    case 'PHP':
      return 'purple'; // var(--bs-purple)
    case 'Python':
      return 'green'; // var(--bs-green)
    case 'Java':
      return 'orange'; // var(--bs-orange)
    case 'C++':
      return 'cyan'; // var(--bs-cyan)
    case 'C#':
      return 'teal'; // var(--bs-teal)
    case 'Ruby':
      return 'pink'; // var(--bs-pink)
    case 'React':
      return 'blue'; // var(--bs-blue)
    case 'Angular':
      return 'red'; // var(--bs-red)
    default:
      return 'default'; // Default color
  }
};