import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import {AlbumsContext} from "../../Contexts/albumsContext";
import {useHistory} from "react-router-dom";
import {toTitleCase} from "../../Utils/StringUtils";

import "./Albums.scss";


const Albums=()=>{
    const history = useHistory();
    const { isLoadingAlbums, albums,sortingDirection} = useContext(AlbumsContext);
    const [data, setData] = useState([]);

    const detailViewNavigate = useCallback(({id}) => {
        history.push(`/${id}`)
    }, [history]);

    const albumsMap=useMemo(()=>(
        data.length!==0?data.map((album,index)=>(
                 <Col xs={12} md={12} lg={6} key={`${index}-${album?.id}`} onClick={()=>detailViewNavigate({id:album?.id})}>
                     <div className="card">
                         <Row xs={12} md={12} lg={12}>
                             <Col xs={12} md={12} lg={6}>
                                 <div><img src={album?.photos[0]?.url} alt="Paris" /></div>
                             </Col>
                             <Col xs={12} md={12} lg={6}>
                                 <div className="mt-4 p-3 d-none d-lg-block">
                                     <p className="title">{toTitleCase(album?.title)}</p>
                                     <p>{`${album?.photos.length+1||0} Pictures`}</p>
                                 </div>
                                 <div className="text-center mt-4 p-3 d-lg-none">
                                     <p className="title">{toTitleCase(album?.title)}</p>
                                     <p>{`${album?.photos.length+1||0} Pictures`}</p>
                                 </div>
                             </Col>
                         </Row>
                     </div>
                 </Col>
        )):<div>Albums not found</div>
    ),[data,detailViewNavigate]);

    useEffect(() => {
        setData([]);
         if(sortingDirection==="ASC"){
             setData(JSON.parse(JSON.stringify(albums.sort((a, b)=>{
                 if(a.title < b.title) { return -1; }
                 if(a.title > b.title) { return 1; }
                 return 0;
             }))))
         }else {
             setData(JSON.parse(JSON.stringify(albums.sort((a, b)=>{
                 if(a.title < b.title) { return 1; }
                 if(a.title > b.title) { return -1; }
                 return 0;
             }))))
         }

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [albums,sortingDirection]);

    return(
            <div className="albums">
                <Container>
                    {
                        isLoadingAlbums ?
                            <div className="text-center mt-5"><Spinner size="lg" animation="border" variant="primary" /></div>
                            : <Row xs={12} md={12} lg={12} className="">{albumsMap}</Row>
                    }
                </Container>
            </div>
    )
}
export default Albums;