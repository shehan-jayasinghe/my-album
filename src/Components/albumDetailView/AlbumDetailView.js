import React, {useContext, useEffect, useMemo, useState} from "react";
import {useParams} from 'react-router-dom';
import "./AlbumDetailView.scss";
import {AlbumsContext} from "../../Contexts/albumsContext";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import {toTitleCase} from "../../Utils/StringUtils";

const AlbumDetailView=()=>{

    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const { isLoadingAlbums,albums} = useContext(AlbumsContext);


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
            setData(albums.filter(album=>parseInt(id)===album?.id))
        }
        setIsLoading(false);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id,albums]);

    return(
        <div className="album-detail-view">
            <Container>
                {isLoading||isLoadingAlbums ? <div className="text-center mt-5"><Spinner size="lg" animation="border" variant="primary" /></div> : <Row xs={12} md={12} lg={12} className="">{photoMap}</Row>}
            </Container>
        </div>
    )
}

export default AlbumDetailView;