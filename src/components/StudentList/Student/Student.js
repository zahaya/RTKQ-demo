import React, { useState } from 'react';
import StudentForm from './StudentForm';
import { useDelStudentMutation } from '../../../store/studentApi';

function Student(props) {

  const [isEdit, setIsEdit] = useState(false)

  // 返回的是一个数组， 操作的触发器；结果集
  const [delStudent, { isSuccess }] = useDelStudentMutation()

  const deleteHandlder = () => {
    delStudent(props.stu.id)
  }

  const cancelEdit = () => {
    setIsEdit(false)
  }


  return (
    <>
      {
        // 不是修改状态且删除不成功显示
        (!isEdit && !isSuccess) &&
        <tr style={{ textAlign: 'center' }}>
          <td>{props.stu.attributes.name}</td>
          <td>{props.stu.attributes.gender}</td>
          <td>{props.stu.attributes.age}</td>
          <td>{props.stu.attributes.address}</td>
          <td>
            <button onClick={deleteHandlder}>删除</button>
            <button onClick={() => setIsEdit(true)}>修改</button>
          </td>
        </tr>
      }
      {
        // 删除成功后显示
        isSuccess && <tr>
          <td colSpan={5}>数据已删除</td>
        </tr>
      }
      {isEdit && <StudentForm stuId={props.stu.id} onCancel={cancelEdit}></StudentForm>}
      {/* {loading && <tr><td colSpan={5}> 正在删除数据。。。</td></tr>}
      {error && <tr><td colSpan={5}>删除失败。。。</td></tr>} */}
    </>

  );
}

export default Student;