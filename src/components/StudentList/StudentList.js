import React from 'react';
import Student from './Student/Student';
import StudentForm from './Student/StudentForm';

function StudentList(props) {
  return (
    <div>
      <table>
        <caption>学生列表</caption>
        <thead>
          <tr>
            <th>姓名</th>
            <th>性别</th>
            <th>年龄</th>
            <th>地址</th>
            <th>删除</th>
          </tr>
        </thead>

        <tbody>
          {props.stus.map(stu => <Student key={stu.id} stu={stu}></Student>)}
        </tbody>
        <tfoot>
          <StudentForm></StudentForm>
        </tfoot>
      </table>
    </div>
  );
}

export default StudentList;