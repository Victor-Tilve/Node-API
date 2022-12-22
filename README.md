# CODING CHALLENGE BACKEND PULPOMATIC
### Technical test to evaluate knowledge in backend using Node.js as the development technology.
### Position: Backend Developer 

## Requerimientos
1. Desarrollar una aplicación que muestre la ayuda monetaria enviada a Sudán.
2. Mostrar las ayudas humanitarias desde el último año hasta 5 años atrás de las diferentes Organizaciones, agencias y gobiernos. 
3. Agrupar la respuesta por años y ordenarla desde la que más haya contribuido en total hasta la que menos.
4. Debe devolver un Json.
5. No requiere interfaz.
6. La información debe ser extraída de: https://iatidatastore.iatistandard.org/documentation
7. La aplicación puede ser un servicio web o una aplicación CLI
8. Dado un código de país la aplicación debe ajustarse a la estructura JSON que se especifica a
continuación.
9. La respuesta necesita estar cacheada o guardada de alguna forma, no importa el método
10. Formato de respuesta:
    ```
    {
      "2011": {
        "Sida": 181469583
      },
      "2010": {
        "Sida": 149667518,
        "UD": 6105000
      },
      "2009": {
        "Sida": 122295311,
        "UD": 30291000
      },
      "2008": {
        "Sida": 128969145,
        "UD": 33851000,
        "Folke Bernadotte Academy": 173000,
        "Svenska institutet": 125000
      },
      "2007": {
        "Sida": 101561481,
        "UD": 7399000,
        "Folke Bernadotte Academy": 6000
      }
    }
    ```
Estos requerimiento son en base al documento que se me suministró a través de correo electrónico.

---
## Analisís y planteamiento
Teniendo en cuenta los requerimientos del proyecto, y observando que dos de ellos se me dejan con dudas (1 y 8), desarrollo una solución planteando lo siguiente: 

* El requerimiento 1 está incluido dentro del requerimiento 8, por lo que procedo a sólo tener en cuenta este último. 

Las tecnologías a utilizar para llevar a cabo la solución del ejercicio son las siguientes: 
* Node.js (Typescript)
* Redis
* Postgresql
* Docker-compose
* Git
* Jsonwebtoken
* Postman

Inicialmente se estudia la API api.iatistandard.org, se realiza un registro y se obtiene un token de acceso con una cantidad limitada de solicitures por segundo. La aplicación tiene 3 tipos de colecciones, como lo importante son las donaciones, y luego de estudiar las tres coleciones, decidí que *Transacciones* era la colección que estaba relacionada con el ejercicio. Los campos que se utilizaron para poder formatear la respuesta, y servirla como lo pide el ejercicio, fueron:
  * transaction_value
  * transaction_value_currency
  * transaction_value_value_date 
  * transaction_provider_org_narrative

Una vez identificada la colección a utilizar y los campos que compondrían la solicitud, se procedió a hacer el query. El transaction_value_currency mostró que existían diferentes tipos de monedas, por lo que se planteó un cambio de divisa, todas convertidas a dólares. Se utilizó la tasa de conversión del 19 de diciembre de 2022 a las 23:55:01 GMT. Muchas transaction_value eran valores negativos, los cuales no se les encontró una explicación y no eran de interés para el ejercicio, por lo que se limitó a realizar las sumas de aquellas donaciones que correspondieran a un mismo año y misma organización.
Teniendo en cuenta que se contaba con un límite de solicitudes, se decidió realizar querys de 100000 rows por request.
Se observó que la API de IATI sólo trabaja con los códigos de los países correspondientes a la ISO3166 Alpha2, que representa a cada país con dos letras mayúscula

## Solución
Inicialmente, se estudió la API api.iatistandard.org, se realizó un registro y se obtuvo un token de acceso con una cantidad limitada de solicitudes por segundo. La aplicación cuenta con 3 tipos de colecciones, y como lo importante son las donaciones, después de estudiar las tres colecciones, se decidió que "Transacciones" era la colección que estaba relacionada con el ejercicio. Los campos que se utilizaron para poder formatear la respuesta y servirla como lo pide el ejercicio fueron:

* El endpoint */api/createUser*, que permite hacer el registro de usuarios nuevos. Este endpoint funciona con una solicitud POST, y en el cuerpo del mensaje se debe proporcionar: name, lastName, Password y email. Nota: el password se hashea para posteriormente ser almacenado en la base de datos junto con el resto de información del nuevo usuario. El swagger de la aplicación se encuentra ubicado en: docs/Api Documentation/swagger.yml
  ```
      "request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\n    \"name\":\"Victor\",\n    \"lastName\":\"Tilve\",\n    \"password\": \"password\",\n    \"email\": \"ing.victortile@gmail.com\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:8080/api/createUser",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"api",
						"createUser"
					]
				}
			}
  ```
* El endpoint */api/login* permite que el usuario se autentique y, como respuesta, obtenga 2 tokens con tiempo de expiración de 15 y 20 minutos: accessToken y refreshToken, respectivamente. El refreshToken permite realizar el refresco de token cuando la vida del accessToken expira. El accessToken es utilizado para acceder a los endpoints que cuentan con validación de token, como /monetary-aid/:countryCode. Para realizar un login, se debe enviar en el cuerpo de la solicitud un JSON con los siguientes campos: email y password. La aplicación validará las credenciales y, si éstas corresponden a un usuario, la API responderá con los dos tokens mencionados anteriormente.
    ```
    "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n    \"password\": \"password\",\n    \"email\": \"ing.victortile@gmail.com\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "http://localhost:8080/api/login",
              "protocol": "http",
              "host": [
                "localhost"
              ],
              "port": "8080",
              "path": [
                "api",
                "login"
              ]
            }
          }
    ```

* */api/logoutUser* Elimina del sistema el refreshToken de tal manera que una vez pasen 15 minutos, no se podrá tener acceso a los endpoints que requeran validación de token y se deberá nuevamente hacer login.
  ```
      "request": {
				"method": "DELETE",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImluZy52aWN0b3J0aWxlQGdtYWlsLmNvbSIsImlhdCI6MTY3MTY4MDMwOCwiZXhwIjoxNjcxNjgxNTA4fQ.Dk7hBi6aKthlXqVvAvasKdgp8yim9_v5MMsCLs9IRQc\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:8080/api/logoutUser",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"api",
						"logoutUser"
					]
				}
			}
  ```
  ```
  ```
* El endpoint *api/monetary-aid/:countryCode* es el endpoint que permite hacer la consulta a la API pública api.iatistandard.org. Una vez que se cuenta con los datos, estos son formateados y se envían al consumidor. Este endpoint cuenta con validación de token, por lo que se debe proporcionar la autenticación, el accessToken, de tipo Bearer Token.

    ```
    "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImluZy52aWN0b3J0aWxlQGdtYWlsLmNvbSIsImlhdCI6MTY3MTY4NDQyOCwiZXhwIjoxNjcxNjg1NjI4fQ.Y1okzMNrVQC0RVay8cQRTrTSXUxiU8Tu_G3RG-4J4yY",
                  "type": "string"
                }
              ]
            },
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:8080/api/monetary-aid/CO",
              "protocol": "http",
              "host": [
                "localhost"
              ],
              "port": "8080",
              "path": [
                "api",
                "monetary-aid",
                "CO"
              ]
            }
          }
    ```
* */api/refreshToken* se utiliza para generar un nuevo accessToken y refreshToken, que permitan seguir con la sesión activa. Para poder utilizarlo, en el cuerpo de la solicitud se debe enviar un el par de valor token: refeshTOken, donde token es el nombre del atributo y refreshToken es el valor persé.

    ```
    "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImluZy52aWN0b3J0aWxlQGdtYWlsLmNvbSIsImlhdCI6MTY3MTY4MDMwOCwiZXhwIjoxNjcxNjgxNTA4fQ.Dk7hBi6aKthlXqVvAvasKdgp8yim9_v5MMsCLs9IRQc\",\n    \"email\": \"ing.victortile@gmail.com\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "http://localhost:8080/api/refreshToken",
              "protocol": "http",
              "host": [
                "localhost"
              ],
              "port": "8080",
              "path": [
                "api",
                "refreshToken"
              ]
            }
          }
    ```

La estructura del projecto es la siguiente:
<p align="center">

  <br/>
</p>

<style>
  .container {
    display: flex;
  }

  .vertical-image {
    align-self: flex-start;
  }

  .horizontal-image {
    align-self: flex-end;
  }
</style>

<div class="container">
  <img src="images/project-layout.png" class="vertical-image">
  <img src="images/src-layout.png" class="vertical-image">
</div>

El proyecto cuenta con el [conventional Commits versión 1](https://www.conventionalcommits.org/en/v1.0.0/), se configuró de tal forma que cada que se realice un commit, se verifica sí se está respetando la convention así como formatear los archivos que se encuentran en el área de stagging. De está forma se garantiza que el proyecto, commits y formateo de archivos, sea consistente.

Se trabaja con variables de entorno. Aunque se observa que existe un archivo ".env" en los archivos de la ruta base, este no fue incluido. Solo se tiene en cuenta para las pruebas. Como el proyecto está orientado a contenedores, las variables de entorno se definen dentro del archivo docker-compose y, con el fin de no exponer información sensible, en la carpeta tools se encuentra un archivo env.dev.sh, el cual debe ejecutarse en el mismo terminal y previo al levantamiento de los contenedores. Este archivo sí se incluye en el repositorio, pero lo ideal es que no se proporcione de esta manera. Sin embargo, por el simple propósito de simplificar la ejecución de los proyectos, se hizo de esta forma.
<p align="center">
  <img src="images/docker-compose-envVar.png">
  <br/>
</p>




### Ejecución de la aplicación
Se da por hecho que se cuenta con docker instalado y corriendo al momento de realizar los siguientes pasos:

1. Las variables de entorno se definen en el archivo docker-compose. Para el caso de Linux, ubicado en la carpeta raíz del proyecto, se ejecuta el comando:

    >source tools/env.dev.sh

    Este comando exporta las variables de manera temporal en el terminal donde se ejecuta. Es importante tener en cuenta que estas variables de entorno solo estarán disponibles mientras el terminal esté abierto. Si se cierra el terminal, las variables de entorno se perderán y habrá que volver a ejecutar el comando para exportarlas de nuevo.

2. Una vez definidas las variables en el sistema, se pueden levantar los servicios definidos en el archivo docker-compose. En una primera instancia, se deben levantar los servicios con el comando:

    >docker-compose up --build

    Para las siguientes ocasiones, solo es necesario ejecutar el comando:
    
    >docker-compose up

    Este comando levantará todos los servicios definidos en el archivo docker-compose.

3. Para realizar las consultas a la API, se puede utilizar una herramienta como Postman. La colección de los queries utilizados se proporciona como un archivo JSON y está ubicado en: docs/otro/Pulpo-IATI Datastore API.postman_collection.json. Este archivo puede ser importado en Postman y hacer uso inmediato de los queries, realizando los cambios que sean necesarios (tokens, user, email, etc).

    Para poder realizar una consulta a la API api.iatistandard.org, es necesario contar con un usuario y hacer login para obtener los tokens. Luego, se puede hacer la consulta a api/monetary-aid/:countryCode.

    Los siguientes son los pasos a seguir para realizar una consulta:

    Crear un usuario: api/createUser
    Hacer login y obtener los tokens: api/login
    Realizar la consulta a api.iatistandard.org: api/monetary-aid/:countryCode
    
    El resto de endpoints están funcionales, pero en cuanto a la solicitud a la API IATI, no están estrechamente relacionados. Es importante tener en cuenta que cada endpoint tiene una función específica y puede ser utilizado de manera independiente. Sin embargo, para poder hacer una consulta a la API IATI es necesario seguir los pasos mencionados anteriormente: crear un usuario, hacer login y obtener los tokens, y finalmente realizar la consulta a la API IATI a través del endpoint api/monetary-aid/:countryCode.
