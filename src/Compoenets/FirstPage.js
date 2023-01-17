import { Link } from "react-router-dom"
export const FirstPage = ()=>{
    return(
        <div className="firstPage">
        <div className="firstPageContainer">
        <img src="https://react-search-github-users.netlify.app/static/media/login-img.45d3b74fbb4ac483314eef377e006a54.svg" alt="" />
        <h1>GitHub User</h1>
        <Link to="/a/login" className="linktologin">
           
                LOG IN / SIGN UP
               
                </Link>
        </div>
        </div>
    )
}