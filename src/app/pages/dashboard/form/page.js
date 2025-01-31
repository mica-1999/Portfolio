import Form_Link from '../../../components/Dashboard/Forms/newMenu';
import Form_Project from '../../../components/Dashboard/Forms/newProject'; 
import Form_Timeline from '../../../components/Dashboard/Forms/newTimeline'; 
import Form_Input from '../../../components/Dashboard/Forms/newUser'; 

export default function insert_Forms() {
  return (
    <div className="row d-flex mt-3">
      <Form_Link />
      <Form_Project />
      <Form_Timeline />
      <Form_Input />
    </div>
  );
}