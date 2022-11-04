import React from 'react'
import { useAppContext } from '../../appContext'
import { KEYS } from './Props'

export default function InputForm() {
  const [ctx,setCtx] = useAppContext()
  const {state} = ctx
  const data = state || {}
  return (
    <div> FORMULAR</div>
  )
}
