<script>
import moment from 'moment'
export default {
  filters: {
    maskData: function (v) {
      v = moment(v).format('DD/MM/YYYY')
      return v
    },
    maskHora: function (v) {
      switch (v) {
        case 1:
          v = '08:00'
          break
        case 2:
          v = '09:00'
          break
        case 3:
          v = '10:00'
          break
        case 4:
          v = '11:00'
          break
        case 5:
          v = '12:00'
          break
        case 6:
          v = '13:00'
          break
        case 7:
          v = '14:00'
          break
        case 8:
          v = '15:00'
          break
        case 9:
          v = '16:00'
          break
        case 10:
          v = '17:00'
          break
        case 11:
          v = '18:00'
          break
        case 12:
          v = '19:00'
          break
        case 13:
          v = '20:00'
          break
        case 14:
          v = '21:00'
          break
        case 15:
          v = '22:00'
          break
      }
      return v
    }
  },
  methods: {
    estadoBrasileiro: function (v) {
      v = v.toUpperCase(v)

      switch (v) {
        case 'AC':
          v = 'Acre'
          break
        case 'AL':
          v = 'Alagoas'
          break
        case 'AP':
          v = 'Amapá'
          break
        case 'AM':
          v = 'Amazonas'
          break
        case 'BA':
          v = 'Bahia'
          break
        case 'CE':
          v = 'Ceará'
          break
        case 'DF':
          v = 'Distrito Federal'
          break
        case 'GO':
          v = 'Goiás'
          break
        case 'MA':
          v = 'Maranhão'
          break
        case 'MT':
          v = 'Mato Grosso'
          break
        case 'MS':
          v = 'Mato Grosso do Sul'
          break
        case 'MG':
          v = 'Minas Gerais'
          break
        case 'PA':
          v = 'Pará'
          break
        case 'PB':
          v = 'Paraíba'
          break
        case 'PR':
          v = 'Paraná'
          break
        case 'PE':
          v = 'Pernambuco'
          break
        case 'PI':
          v = 'Piauí'
          break
        case 'RJ':
          v = 'Rio de Janeiro'
          break
        case 'RN':
          v = 'Rio Grande do Norte'
          break
        case 'RS':
          v = 'Rio Grande do Sul'
          break
        case 'RO':
          v = 'Rondônia'
          break
        case 'RR':
          v = 'Roraima'
          break
        case 'SC':
          v = 'Santa Catarina'
          break
        case 'SP':
          v = 'São Paulo'
          break
        case 'SE':
          v = 'Sergipe'
          break
        case 'TO':
          v = 'Tocantins'
          break
      }
      return v
    }

  }
}
</script>
