import React, {useCallback, useEffect, useReducer} from "react";
import {getAlbumPhotosId, getAlbumsByUserId} from "../Services/AlbumsServices";
import {toast} from "react-toastify";


const AlbumsContext =React.createContext();


const initialState = {
  isLoadingAlbums:false,
  sortingDirection:"ASC",
  albums:[]
};


const AlbumsContextActions ={
    SET_ALBUMS: "setAlbums",
    SET_IS_LOADING_ALBUMS: "setIsLoadingAlbums",
    SET_SORT: "setSort",
}

const reducer =(state,action)=>{
    console.debug('%c Album Action', 'background: #222; color: #bada55',action);
    switch (action.type) {
        case AlbumsContextActions.SET_ALBUMS: {
            return { ...state, albums: action.albums };
        }
        case AlbumsContextActions.SET_IS_LOADING_ALBUMS: {
            return { ...state, isLoadingAlbums: action.isLoadingAlbums };
        }
        case AlbumsContextActions.SET_SORT: {
            return { ...state, sortingDirection: action.sortingDirection };
        }
        default:
            return state;
    }
}

const AlbumsContextProvider=(props)=>{
    const [state,dispatch]=useReducer(reducer, initialState);


    const setSort = useCallback( (sortingDirection) => {
        dispatch({type: AlbumsContextActions.SET_SORT, sortingDirection});
    }, [dispatch]);


    const getAlbums = useCallback(async () => {
        try {
            dispatch({type: AlbumsContextActions.SET_IS_LOADING_ALBUMS, isLoadingAlbums: true});
            const albums = await getAlbumsByUserId({userId:2});
            let albumsWidthPhotos=[];
            if(albums.length!==0){
                albumsWidthPhotos=albums.filter(album=>album?.id!==16);
                albumsWidthPhotos= await Promise.all(albumsWidthPhotos.map(async album => {
                    if (album?.id) {
                        const albumPhotos = await getAlbumPhotosId(album?.id);
                        return {...album, photos: albumPhotos}
                    } else {
                        return {...album, photos: []}
                    }
                }));
            }
            dispatch({type: AlbumsContextActions.SET_ALBUMS, albums: albumsWidthPhotos});
        }catch (e) {
            console.error(e);
            toast.error(
                <div>
                    Failed to load albums!
                    <br />
                    {e.message ? `Error: ${e.message}` : "Please try again later."}
                </div>
            );
        }finally {
            dispatch({type: AlbumsContextActions.SET_IS_LOADING_ALBUMS, isLoadingAlbums: false});
        }
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            await getAlbums();
        })();
        // eslint-disable-next-line
    }, []);


    const value ={
        ...state,
        setSort
    }

    return <AlbumsContext.Provider value={value}>{props.children}</AlbumsContext.Provider>
}


const AlbumsContextConsumer = AlbumsContext.Consumer;


export {AlbumsContext,AlbumsContextProvider,AlbumsContextConsumer,AlbumsContextActions}

