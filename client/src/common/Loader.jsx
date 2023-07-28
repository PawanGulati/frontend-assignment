import './Loader.css'
import { Box } from "@mui/material";

export default function Loader({isLoading = false, className=""}){
    return isLoading ? <Box className={`loader-container ${className}`} />: null

}