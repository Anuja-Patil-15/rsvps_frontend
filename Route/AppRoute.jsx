import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import InvitationReveal from '../src/components/InvitationReveal'
import MultiStageRSVPForm from '../src/components/MultiStageRSVPForm'
const AppRoute = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<InvitationReveal />} />
            <Route path='/InvitationForm' element={<MultiStageRSVPForm />} />
        </Routes>
      
    </Router>
  )
}

export default AppRoute
