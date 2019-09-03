## Install
`npm install vue-cvss`

## Import
`import CVSS from 'vue-cvss'`

## Use
`<CVSS></CVSS>`

## Attributes & Methods 
|keyword|type|description|
|---|---| --- |
|initCVSS|attr| This is a json object that you can use to initialize your calculator. |
|Env|attr|This keyword controls whether environmental factors are added.|
|isDisabled|attr|Sometimes you don't want the user to do it.|
|getCvss| method|This is a method through which you can obtain CVSS calculations, including CVSS objects, scores, and grades. It's triggered after each calculation.|

## Example
```
    <div>
        <Cvss :initCVSS="obj" :isDisabled="true" :Env="true" @getCvss="showResult">
    </div>
    <script>
        import Cvss from 'vue-cvss'
        data () {
            return {
                obj: {
                    AV: 'N',
                    AC: 'L',
                    PR: 'N',
                    UI: 'N',
                    S: 'U',
                    C: 'N',
                    I: 'N',
                    A: 'N',
                }
            }
        },
        methods: {
            showResult (cvssObj, score, rating) {
                console.log(cvssObj, score, rating)
            }
        }
    </script>
```
## Notice 
> Currently only supports Chinese