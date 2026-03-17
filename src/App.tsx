import Navbar from "./components/shared/navbar"
function App() {
  return (
    <>
      <div className="flex flex-col min-h-svh">
        <Navbar />
        <main className="flex-1"> Contéudo principal</main>
        <footer>Rodapé</footer>
      </div>
    </>
  )
}

export default App