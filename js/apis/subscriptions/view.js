class SubscriptionsView extends FirebaseDatabaseFolderView {

    constructor() {
        super();

    }
    get itemsContainer() {
        return document.querySelector("#subscriptions  tbody")
    }
    hideApproveButton = false
    hidePrintButton = false
    display(subscription, key) {
        var {
            //duration,
            price,
            //grade,
            subjects
        } = subscription

        subscription.subjects = Object.values(subjects)

        subscription.price = price || PricingCalculator.calculate(subscription)

        var view = new SingleSubscriptionView(subscription);
        view.show()
        view.on('APPROVE', () => {
            let data = {
                key,
                duration: subscription.duration,
                price: subscription.price
            }
            this.triggerEvent('APPROVE', data)


        })

        view.on('PRINT', () => this.triggerEvent('PRINT', subscription))

        if (this.hideApproveButton) view.approveButton.parentElement.style.display = 'none'
        if (this.hidePrintButton) view.printButton.parentElement.style.display = 'none'
        return view
    }

    // Function to show a toast
    notifySubscriptionExpiry() {
        M.toast({
            html: '<span>Sua inscricao esta prestes a terminar</span><button class="btn-flat toast-action" onclick="M.Toast.dismissAll()">Close</button>',
            displayLength: 300000 // 5 minutes in milliseconds
        });
    }

    print(subscription) {

        function calculateAge(dateOfBirth) {
            // Convert the date of birth from string to a Date object
            const birthDate = new Date(dateOfBirth);

            // Get the current date
            const today = new Date();

            // Calculate the age
            let age = today.getFullYear() - birthDate.getFullYear();

            // Adjust the age if the birth date has not occurred yet this year
            const monthDifference = today.getMonth() - birthDate.getMonth();
            const dayDifference = today.getDate() - birthDate.getDate();

            if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
                age--;
            }

            return age;
        }



        var {
            gender,
            parent,
            deficiency,
            occupation,
            phoneNumber,
            phoneNumber2,
            name,
            email,
            birthDate
        } = this.user

        var age = calculateAge(birthDate)

        var {
            period,
            subjects,
            grade,
            price,
            duration,
        } = subscription


        var div = document.createElement('div')
        div.id = 'print-subscription'

        div.innerHTML = `
            <img src="logo.png" style="height: 40pt;">
        <p style="text-align: center;">
            <b>Ficha de Inscrição da ${grade}ª classe</b>
        </li>
    
        <table border="1" style="width: inherit;">
        <tr>
            <td style="text-align:center;" colspan="2">Pagamento da Inscrição</td>
        </tr>
        <tr>
            <td>Numerário</td>
            <td>${price}.00 MZN</td>
        </tr>
        <tr>
            <td>Extenso</td>
            <td>${extenso(price)}</td>
        </tr>
        </table>

        <b>Informação do Estudante</b>
        <ul class="browser-default student-information">
        <li><strong>Nome Completo:</strong> ${name}</li>
        <li><strong>Idade:</strong> ${age}</li>
        <li><strong>Sexo:</strong> ${gender == 'male'?'Masculino':'Feminino'}</li>
        <li><strong>Período de Explicação:</strong> ${period == 'morning'?'Manhas':'Tardes'}</li>
        <li><strong>Deficiência:</strong> ${deficiency}</li>
        <li><strong>Disciplina que deseja ser explicado:</strong> ${subjects.join(', ')}.</li>
        <li><strong>Nome do Encarregado de Educação:</strong> ${parent}</li>
        <li><strong>Ocupação:</strong> ${occupation}</li>
        <li><strong>Contactos:</strong></li>
        </ul>
        <ul class="browser-default contact">
            <li>Celular1: ${phoneNumber}</li>
            <li>Celular 2: ${phoneNumber2}</li>
            <li>E-mail:${email}</li>
        </ul>

        `
        document.body.append(div)

        const pdf = new jspdf.jsPDF('p', 'pt', [612.288, 790.872]);

        var margin = {
            top: 40,
            left: 40,
            bottom: 40,
            right: 40
        }
        return new Promise(resolve => {
            pdf.html(div, {

                margin: [margin.top, margin.right, margin.bottom, margin.left],
                autoPaging: "text",
                filename: "subscription.pdf",
                //x: 57,
                //y: 57,
                autoPaging: true, // Enable auto-paging
                callback: (doc) => {
                    div.remove()
                    doc.save()
                    resolve()
                }
            })
        })

    }



}