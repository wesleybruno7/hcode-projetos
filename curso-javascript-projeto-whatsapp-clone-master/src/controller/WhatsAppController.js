class WhatsAppController {
    constructor() {
        console.log('WhatsappController OK');

        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
    }

    loadElements() {

        this.el = {}

        // coleta todos os elementos e "cria" as variaveis convertendo o nome das classes html para variavel js
        document.querySelectorAll('[id]').forEach(element => {
            this.el[Format.getCamelCase(element.id)] = element;
        });
    }

    elementsPrototype() {
        // aplica o display none no elemento quando chamado esta funcao
        Element.prototype.hide = function() {
            this.style.display = 'none';
            return this; // permite chamada de outras funcoes apos finalizar essa funcao, assim podemos execucar funcoes em sequencia. Ex.: el.hide().show()
        }

        // aplica o display block no elemento quando chamado esta funcao
        Element.prototype.show = function() {
            this.style.display = 'block';
            return this;
        }

        // aplica o toggle no elemento (mostra ou oculta) quando chamado esta funcao
        Element.prototype.toggle = function() {
            this.style.display = (this.style.display === 'none') ? 'block' : 'none';
            return this;
        }

        // adicionar eventListener ao elemento quando chamado esta funcao
        Element.prototype.on = function(events, fn) {
            events.split(' ').forEach(event => {
                this.addEventListener(event, fn);
            });
            return this;
        }

        // permite aplicar varias alteracoes de css de uma vez (chamando esta funcao ".css")
        Element.prototype.css = function(styles) {
            for (let name in styles) {
                this.styles[name] = styles[name];
            }
            return this;
        }

        // adiciona uma classe no elemento html quando chamado essa funcao
        Element.prototype.addClass = function(name) {
            this.classList.add(name);
            return this;
        }

        // remove uma classe no elemento html quando chamado essa funcao
        Element.prototype.removeClass = function(name) {
            this.classList.remove(name);
            return this;
        }

        // realiza o toggle (adiciona ou remove uma classe) no elemento html quando chamado essa funcao
        Element.prototype.toggleClass = function(name) {
            this.classList.toggle(name);
            return this;
        }

        // verifica se existe alguma classe especifica no elemento html quando chamado essa funcao retornando "true" ou "false"
        Element.prototype.hasClass = function(name) {
            return this.classList.contains(name);
        }

        HTMLFormElement.prototype.getForm = function() {
            return new FormData(this)  
        }

        HTMLFormElement.prototype.toJSON = function() {
            let json = {}

            this.getForm().forEach((value, key) => {
                json[key] = value;
            });
            
            return json;
        }
    }

    initEvents() {
        this.el.myPhoto.on('click', e => {
            this.closeAllLeftPanel();
            this.el.panelEditProfile.show();
            setTimeout(() => {
                this.el.panelEditProfile.addClass('open');
            }, 300);
        });

        this.el.btnNewContact.on('click', e => {
            this.closeAllLeftPanel();
            this.el.panelAddContact.show();
            setTimeout(() => {
                this.el.panelAddContact.addClass('open');
            }, 300);
        });

        this.el.btnClosePanelEditProfile.on('click', e => {
            this.el.panelEditProfile.removeClass('open');
        });

        this.el.btnClosePanelAddContact.on('click', e => {
            this.el.panelAddContact.removeClass('open');
        });

        this.el.photoContainerEditProfile.on('click', e => {
            this.el.inputProfilePhoto.click();
        });

        this.el.inputNamePanelEditProfile.on('keypress', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.el.btnSavePanelEditProfile.click();
            }
        });

        this.el.btnSavePanelEditProfile.on('click', e => {
            console.log(this.el.inputNamePanelEditProfile.innerHTML);
        });

        this.el.formPanelAddContact.on('submit', e => {
            e.preventDefault();
            let formData = new FormData(this.el.formPanelAddContact);
        });
    }

    closeAllLeftPanel() {
        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();
    }
}