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
    program: string;
  }

  const MedicoForm =()=>{
    const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
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
        }
    )
return(
   
        
          <form>
            <input type="text" name="name" placeholder="Nombre" />
            <input type="email" name="email" placeholder="Correo" />
            <input type="text" name="phone" placeholder="Teléfono" />
            <select name="especialidad">
                <option value="">Seleccione una especialidad</option>
            {
                especialidades.map(
                    (especialidad)=>{
                        return(
                        <option value={especialidad.code}>
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
  export default MedicoForm;