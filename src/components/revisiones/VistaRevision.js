import React, { useContext } from 'react'
import revisionContext from '../../context/revisiones/revisionContext';
import Revision from './Revision';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const VistaRevision = ({}) => {

    const revisionesContext = useContext(revisionContext);
    const { revision } = revisionesContext;

    if(!revision) return <h1 className="margen-top">HOMAR <span>Revisión</span></h1>

    const [revisionActual] = revision;

    

    return (
        <div>
            <>
            <div className="container box-order-detail">
                <h2>Revisión: {revisionActual.doc_revisado} </h2>

                <TransitionGroup>
                    {revision.map(revision => (
                        <CSSTransition
                            key={revision._id}
                            timeout={200}
                            classNames="tarea"
                        >
                            <Revision
                                revision={revision}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>


            </div>


            </>
        </div>
    )
}

export default VistaRevision
