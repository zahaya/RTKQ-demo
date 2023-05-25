import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


// 创建Api对象
//createApi() 用来创建RTKQ中的API对象
// RTKQ的所有功能都需要通过该对象来进行
// createApi() 需要一个对象作为参数
const studentApi = createApi({
  reducerPath: 'studentApi', // Api的标识，不能和其他的Api或reducer重复
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api/"
  }),// 指定查询的基础信息，发送请求使用的工具
  tagTypes: ['student'],
  endpoints(builder) {
    // build是请求的构建器，通过build来设置请求的相关信息
    return {
      getStudents: builder.query({
        query() {
          // 用来指定请求子路径
          return 'students';
        },
        // 用来对响应数据格式进行转换
        transformResponse(baseQueryReturnValue) {
          return baseQueryReturnValue.data
        },
        providesTags: [{ type: 'student', id: 'LIST' }]
      }),
      getStudentsById: builder.query({
        query(id) {
          return `students/${id}`
        },
        transformResponse(baseQueryReturnValue) {
          return baseQueryReturnValue.data
        },
        keepUnusedDataFor: 60,    //设置缓存时间，超过时间则取消缓存
        providesTags: (result, err, id) => [{ type: 'student', id }]
      }),
      delStudent: builder.mutation({
        query(id) {
          return {
            //发送的不是get请求，需要返回一个对象来设置请求的信息
            url: `students/${id}`,
            method: 'delete'
          }
        },
        invalidatesTags: ['student']
      }),
      addStudent: builder.mutation({
        query(stu) {
          return {
            url: `students`,
            method: 'post',
            body: { data: stu }
          }
        },
        invalidatesTags: [{ type: 'student', id: 'LIST' }]  //使student标签失效 getStudents标签失效则触发事件
      }),
      updateStudent: builder.mutation({
        query(stu) {
          return {
            url: `students/${stu.id}`,
            method: 'put',
            body: { data: stu.attributes }
          }
        },

        invalidatesTags: (result, err, stu) => [{ type: 'student', id: stu.id }, { type: 'student', id: 'LIST' }]
      })
    };
  }// endpoints 用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值
});

// Api对象创建后，对象中会根据各种方法自动的生成对应的钩子函数
// 通过这些钩子函数，可以来向服务器发送请求
// 钩子函数的命名规则 getStudents --> useGetStudentsQuery
export const {
  useGetStudentsQuery,
  useGetStudentsByIdQuery,
  useDelStudentMutation,
  useAddStudentMutation,
  useUpdateStudentMutation
} = studentApi;

export default studentApi;
