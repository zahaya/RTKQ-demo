import React, { useEffect, useState } from 'react';
import { useAddStudentMutation, useGetStudentsByIdQuery, useUpdateStudentMutation } from '../../../store/studentApi';

function StudentForm(props) {

  const [inputData, setInputData] = useState({
    name: '',
    gender: '男',
    age: '',
    address: ''
  })

  const { data: stuData, isSuccess } = useGetStudentsByIdQuery(props.stuId, {
    skip: !props.stuId,
  })

  useEffect(() => {
    if (isSuccess) {
      setInputData(stuData.attributes)
    }
  }, [isSuccess])

  const nameChangeHandler = (e) => {
    setInputData(prevState => ({ ...prevState, name: e.target.value }))
  }
  const ageChangeHandler = (e) => {
    setInputData(prevState => ({ ...prevState, age: +e.target.value }))
  }
  const addresssChangeHandler = (e) => {
    setInputData(prevState => ({ ...prevState, address: e.target.value }))
  }
  const genderChangeHandler = (e) => {
    setInputData(prevState => ({ ...prevState, gender: e.target.value }))
  }


  const [addStudent, { isSuccess: isAddSuccess }] = useAddStudentMutation()
  const submitHandler = () => {
    addStudent(inputData)
    setInputData({
      name: '',
      gender: '男',
      age: '',
      address: ''
    })
  }

  const [updateStudent, { isSuccess: isUpdateSuccess }] = useUpdateStudentMutation()
  const updateHandler = () => {
    updateStudent({
      id: props.stuId,
      attributes: inputData
    })
    props.onCancel()
  }

  // 使用useReducer
  // const Reducer = (state, action) => {
  //   const { type, value } = action
  //   switch (type) {
  //     case 'name':
  //       return {
  //         ...state,
  //         name: value
  //       }
  //     case 'age':
  //       return {
  //         ...state,
  //         age: value
  //       }
  //     case 'gender':
  //       return {
  //         ...state,
  //         gender: value
  //       }
  //     case 'address':
  //       return {
  //         ...state,
  //         address: value
  //       }
  //   }
  // }

  // const [inputData, setInputData] = useReducer(Reducer, {
  //   name: '',
  //   age: '',
  //   gender: '男',
  //   address: ''
  // })

  // const nameChangeHandler = (e) => {
  //   setInputData({ type: 'name', value: e.target.value })
  // }

  // const genderChangeHandler = (e) => {
  //   setInputData({ type: 'gender', value: e.target.value })
  // }
  // const ageChangeHandler = (e) => {
  //   setInputData({ type: 'age', value: e.target.value })
  // }
  // const addresssChangeHandler = (e) => {
  //   setInputData({ type: 'address', value: e.target.value })
  // }

  // const submitHandler = () => {
  //   console.log(inputData);
  // }


  return (
    <>
      <tr>
        <td><input type="text" onChange={nameChangeHandler} value={inputData.name} /></td>
        <td>
          <select onChange={genderChangeHandler} value={inputData.gender}>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </td>
        <td><input type="text" onChange={ageChangeHandler} value={inputData.age} /></td>
        <td><input type="text" onChange={addresssChangeHandler} value={inputData.address} /></td>
        <td>
          {props.stuId && <><button onClick={updateHandler}>确认</button> <button onClick={props.onCancel}>取消</button></>}
          {!props.stuId && <button onClick={submitHandler}>添加</button>}
        </td>

      </tr>
      {/* {loading && <tr><td colSpan={5}>添加中。。。</td></tr>}
      {error && <tr><td colSpan={5}>添加失败</td></tr>} */}

    </>

    // <tr>
    //   <td><input type="text" onChange={nameChangeHandler} value={inputData.name} /></td>
    //   <td>
    //     <select value={inputData.gender} onChange={genderChangeHandler}>
    //       <option value="男">男</option>
    //       <option value="女">女</option>
    //     </select>
    //   </td>
    //   <td><input type="text" value={inputData.age} onChange={ageChangeHandler} /></td>
    //   <td><input type="text" value={inputData.address} onChange={addresssChangeHandler} /></td>
    //   <td><button onClick={submitHandler}>添加</button></td>
    // </tr>
  );
}

export default StudentForm;