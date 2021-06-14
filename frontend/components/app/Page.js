const Page = ({ ...props }) => {
  return (
    <>
      {" "}
      <main {...props} />
      <div className="z-30 fixed left-0 top-0 h-full w-full items-center justify-center p-8 flex bg-white bg-opacity-100 lg:hidden">
        <h3>This page is not mobile optimized yet!</h3>
      </div>
    </>
  )
}

export default Page
