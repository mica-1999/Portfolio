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

export function formatNumber(num) {
    if (num >= 10000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num;
}

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