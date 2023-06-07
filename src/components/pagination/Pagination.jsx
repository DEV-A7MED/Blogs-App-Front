import "./pagination.css";

const Pagination = ({pages,currentPage,setCurrentPage}) => {
  // const POST_PER_PAGE = 3;
  const generatedPages=[];
  for (let index = 1; index <= pages; index++) {
    generatedPages.push(index)
  }

  return (
    <div className="pagination">
      <button 
        onClick={()=>setCurrentPage( current => current - 1)}
        disabled={currentPage===1}
        className="page previous" >
          Previous
      </button>
      {generatedPages.map((page) => (
        <div onClick={()=>setCurrentPage(page)} className={currentPage===page?"page active":"page"} key={page}>
          {page}
        </div>
      ))}
      <button 
        onClick={()=>setCurrentPage(current => current + 1)}    className="page next" 
        disabled={currentPage===pages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
