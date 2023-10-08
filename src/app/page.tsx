

async function getData() {
  await new Promise(res => setTimeout(res, 4000))
  
}

export default async function Home() {
  await getData();

  return (
    <main>
      <h1>Página Home</h1>
    </main>
  )
}