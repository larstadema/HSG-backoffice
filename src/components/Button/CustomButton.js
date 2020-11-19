import React from 'react'

import {Tooltip, IconButton} from '@material-ui/core'

export default ({ children, onClick, tip, btnClassName, tipClassName, disabled, color }) => (
  <Tooltip title={tip} className={tipClassName} placement="top">
    <span>
      <IconButton onClick={onClick} color={color} className={btnClassName} disabled={disabled}>
        {children}
      </IconButton>
    </span>
  </Tooltip>
)
