import Form_Link from '/src/app/components/Dashboard/management/newMenu';
import Form_Project from '/src/app/components/Dashboard/management/newProject'; 
import Form_Timeline from '/src/app//components/Dashboard/management/newTimeline'; 
import Form_Input from '/src/app/components/Dashboard/management/newUser';
import UserManage from  '/src/app/components/Dashboard/management/manageUser'; 

export default function insert_Forms() {
  return (
    <>
    <div className="row d-flex">
      <UserManage />
      {/* <Form_Link />
      <Form_Project />
      <Form_Timeline />
      <Form_Input />  */}
    </div>
    </>
  );
  
}