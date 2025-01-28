import Form_Link from '../../components/Dashboard/Forms/newMenu'; // Import the Forms component
import Form_Project from '../../components/Dashboard/Forms/newProject'; // Import the Forms component
import Form_Timeline from '../../components/Dashboard/Forms/newTimeline'; // Import the Forms component

export default function insert_Forms() {
  return (
    <div className="row d-flex mt-3">
      <Form_Link />
      <Form_Project />
      <Form_Timeline />
    </div>
  );
}