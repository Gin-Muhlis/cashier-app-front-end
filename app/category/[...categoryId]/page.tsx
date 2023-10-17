import React from 'react'

const CategoryDetail = ({params} : {params:{categoryId: string}}) => {
  return (
    <div>Category {params.categoryId}</div>
  )
}

export default CategoryDetail