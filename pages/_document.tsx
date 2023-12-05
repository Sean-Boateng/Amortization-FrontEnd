import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
  {/* Add the Google Fonts link tags here */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@700&family=Roboto:wght@700&display=swap"
    rel="stylesheet"
  />
  <link
    rel="preconnect"
    href="https://fonts.googleapis.com"
  />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    // @ts-ignore
    crossOrigin={true}
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
    rel="stylesheet"
  />
  <link rel="stylesheet" href="your-stylesheet-url" crossOrigin="anonymous" />
  <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@700&family=Roboto:wght@700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
          />
</Head>

      
      <body>
        
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
