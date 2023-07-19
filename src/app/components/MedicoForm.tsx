import { useEffect, useState } from "react";



interface Especialidad{
    name:string;
    code:number;
    _links: Record<string,{href:string}>
}
interface Medico {
    name: string;
    email: string;
    phone: string;
    especialidad: string;
  }

  const MedicoForm = ()=>{
    const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
    const handleSubmit =async(e:any)=>{
        e.preventDefault()

        const myMedico:Medico={
            name:e.target.name.value,
            email:e.target.email.value,
            phone:e.target.phone.value,
            especialidad:e.target.especialidad.value


        }

        console.log(e)
    
    try {
        const response = await fetch("http://localhost:8080/medicos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(myMedico)
    })
    const data = await response.json();
      } catch (error) {
        console.error(error)
    }

    useEffect(
        ()=>{
            const fetchEspecialidades = async()=>{
                try{
                    const response=await fetch("http://localhost:8080/especialidades")
                    const data = await response.json()
                    setEspecialidades(data.embedded.especialidades)
                }catch(error){
                    console.error(error)
                }

            };

            fetchEspecialidades();
        },[]);
    }
return(
   
        
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Nombre" />
            <input type="email" name="email" placeholder="Correo" />
            <input type="text" name="phone" placeholder="Teléfono" />
            <select name="especialidad">
                <option key="" value="">Seleccione una especialidad</option>
            {
                especialidades.map(
                    (especialidad)=>{
                        return(
                        <option key={especialidad.code} value={especialidad.code}>
                            {especialidad.name}

                        </option>
                        )
                    }
                )
            }
                
            </select>
            
            </form>
            
)

        } 
  export default MedicoForm