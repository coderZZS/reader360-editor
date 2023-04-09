import React from 'react'

export default (props: any) => {
    return <React.Suspense fallback={<h3>loading...</h3>}></React.Suspense>
}
