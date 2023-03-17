import React, {useContext, useEffect, useMemo, useState} from "react";
import {useParams} from 'react-router-dom';
import {AlbumsContext} from "../../Contexts/albumsContext";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import {toTitleCase} from "../../Utils/StringUtils";

import "./AlbumDetailView.scss";
const AlbumDetailView=()=>{

    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const { isLoadingAlbums,albums,sortingDirection} = useContext(AlbumsContext);


    const photoMap=useMemo(()=>(
        <>
            {data.length!==0 &&<div>
                <h4 className="mb-4">{toTitleCase(data[0]?.title||"-")}</h4>
                <Row>
                    {
                        data[0]?.photos.length!==0?data[0]?.photos.map((photo,index)=>(
                            <Col xs={12} md={4} lg={3} key={`${index}-${photo?.id}`}>
                                <div className="card">
                                    <img src={photo?.url} alt="Paris" />
                                </div>
                            </Col>
                        )):<div>Photos not found</div>
                    }
                </Row>
            </div>
            }
        </>
    ),[data]);


    useEffect(() => {
        setIsLoading(true);
        if(id){
            const photosAlbum = albums.filter(album=>parseInt(id)===album?.id);
            if(photosAlbum.length!==0){
                let sortedPhoto;
                if(sortingDirection==="ASC"){
                    sortedPhoto=JSON.parse(JSON.stringify(photosAlbum[0].photos.sort((a, b)=>{
                        if(a.title < b.title) { return -1; }
                        if(a.title > b.title) { return 1; }
                        return 0
                    })));
                    setData([{...photosAlbum,photos:sortedPhoto}]);
                }else {
                    sortedPhoto=JSON.parse(JSON.stringify(photosAlbum[0].photos.sort((a, b)=>{
                        if(a.title < b.title) { return 1; }
                        if(a.title > b.title) { return -1; }
                        return 0
                    })));
                    setData([{...photosAlbum,photos:sortedPhoto}]);
                }
            }
        }
        setIsLoading(false);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id,albums,sortingDirection]);


    return(
        <div className="album-detail-view">
            <Container>
                {isLoading||isLoadingAlbums ? <div className="text-center mt-5"><Spinner size="lg" animation="border" variant="primary" /></div> : <Row xs={12} md={12} lg={12} className="">{photoMap}</Row>}
            </Container>
        </div>
    )
}

export default AlbumDetailView;