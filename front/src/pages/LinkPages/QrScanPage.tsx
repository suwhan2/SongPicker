import React, { useState } from 'react'
import QrScanner from 'react-qr-scanner'
import SubTopNavbar from '../../components/molecules/commons/SubTopNavbar'


const QrScanPage = () => {
  const [result, setResult] = useState<string>('') // result를 string으로 유지
  const [hasScanned, setHasScanned] = useState<boolean>(false) // 스캔 여부 상태 추가

  const handleScan = (data: string | null) => {
    if (data && !hasScanned) {
      console.log('Scanned QR Data:', data)
      setResult(data)
      setHasScanned(true)
    }
  }

  const handleError = (err: Error) => {
    console.error('QR Scan Error:', err)
  }

  return (
    <div className="flex flex-col h-screen">
      <SubTopNavbar title='QR코드 스캔' />
      <div className="flex-1 flex flex-col">
        <div className="relative w-full" style={{ height: '66.67vh' }}>
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            constraints={{
              video: {
                facingMode: "environment"
              }
            }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-3/4 h-0" style={{ paddingBottom: '75%' }}>
              <div className="absolute inset-0 border-[2.5px] border-white" />
              <div className="absolute -inset-1/2">
                <div className="absolute inset-0 w-full h-full bg-transparent" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-black flex items-center justify-center p-4">
          <div className="text-center text-white text-lg font-bold">
            노래방기계에 있는 QR코드를 스캔해주세요
          </div>
        </div>
      </div>
      {result && (
        <div className="p-4 bg-base-200">
          <h2 className="text-lg font-semibold mb-2">스캔 결과:</h2>
          <p>{result}</p> {/* 스캔된 결과를 화면에 표시 */}
        </div>
      )}
    </div>
  )
}

export default QrScanPage
