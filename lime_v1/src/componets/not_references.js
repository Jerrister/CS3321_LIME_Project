import no_ref_img from "../assets/img/no_reference.png";
export default function NotReference_Page() {
    return(
        <>
            <div style={{ textAlign: 'center', padding: '24px' }}>
            <div style={{ height: "200px" }}>
            <img src={no_ref_img} alt="Logo" style={{ maxHeight: '100%',  padding: '0px 0px 0px 9px' }} />
            </div>
    
            <h3>There is no references yet</h3>
    
            
            <p>Drop your files here to add references to your library or use the “Add new” button in the top left corner.</p>
                
            </div>
        </>
    )
}