import { Injectable } from "@angular/core";

/**
 * Valixar chave pix - passando somente o valor da chave
 * @author Starley Cazorla
 */

@Injectable({ providedIn: 'root' })
export class ValidacaoPix {

    constructor() { }

    /**
     * Validar cpf
     * @author Starley Cazorla
     * @param cpf 
     * @returns true if cpf 
     */
    validarCPF(cpf: string): boolean {
        let soma = 0;
        let resto;

        if (cpf === '00000000000') {
            return false;
        }

        for (let i = 1; i <= 9; i++) {
            soma = soma + parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
        }

        resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) {
            resto = 0;
        }

        if (resto !== parseInt(cpf.substring(9, 10), 10)) {
            return false;
        }

        soma = 0;

        for (let i = 1; i <= 10; i++) {
            soma = soma + parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
        }

        resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) {
            resto = 0;
        }

        if (resto !== parseInt(cpf.substring(10, 11), 10)) {
            return false;
        }

        return true;
    }

    /**
     * Validar cnpj
     * @author Starley Cazorla
     * @param cnpj 
     * @returns true if cnpj 
     */
    validarCNPJ(cnpj: string): boolean {
        // Remover caracteres não numéricos
        cnpj = cnpj.replace(/[^\d]/g, '');

        // Verificar se o CNPJ possui 14 dígitos
        if (cnpj.length !== 14) {
            return false;
        }

        // Verificar se todos os dígitos são iguais (CNPJ inválido)
        if (/^(\d)\1+$/.test(cnpj)) {
            return false;
        }

        // Calcular os dígitos verificadores
        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        const digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        // Verificar o primeiro dígito verificador
        if (resultado !== parseInt(digitos.charAt(0), 10)) {
            return false;
        }

        tamanho++;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        // Verificar o segundo dígito verificador
        if (resultado !== parseInt(digitos.charAt(1), 10)) {
            return false;
        }

        // CNPJ válido
        return true;
    }

    /**
     * Validar ddd de todos os estados brasileiros
     * @author Starley Cazorla
     * @param ddd
     * @returns true if ddd
     */
    validarDDD(ddd: string): boolean {
        const dddsValidos = [
            '11', '12', '13', '14', '15', '16', '17', '18', '19', // SP
            '21', '22', '24', // RJ
            '27', '28', // ES
            '31', '32', '33', '34', '35', '37', '38', // MG
            '41', '42', '43', '44', '45', '46', // PR
            '47', '48', '49', // SC
            '51', '53', '54', '55', // RS
            '61', // DF e GO
            '62', '64', // GO
            '63', // TO
            '65', '66', // MT
            '67', // MS
            '68', // AC
            '69', // RO
            '71', '73', '74', '75', '77', // BA
            '79', // SE
            '81', '87', // PE
            '82', // AL
            '83', // PB
            '84', // RN
            '85', '88', // CE
            '86', '89', // PI
            '91', '93', '94', // PA
            '92', '97', // AM
            '95', // RR
            '96', // AP
            '98', '99', // MA
        ];

        return dddsValidos.includes(ddd);
    }

    /**
     * Validar numero telefone
     * @author Starley Cazorla
     * @param telefone 
     * @returns true if numero telefone 
     */
    private validarNumeroTelefone(telefone: string): boolean {
        // Remover caracteres não numéricos
        telefone = telefone.replace(/\D/g, '');

        // Verificar o formato do número de telefone fixo (10 dígitos) com DDD
        const formatoFixo = /^\d{10}$/;

        if (formatoFixo.test(telefone)) {
            const ddd = telefone.substring(0, 2);
            const numero = telefone.substring(2);

            return this.validarDDD(ddd) && numero.length === 8;
        }

        // Verificar o formato do número de telefone celular (11 dígitos) com DDD
        const formatoCelular = /^\d{11}$/;

        if (formatoCelular.test(telefone)) {
            const ddd = telefone.substring(0, 2);
            const numero = telefone.substring(2);

            return this.validarDDD(ddd) && numero.length === 9;
        }

        // Número de telefone inválido
        return false;
    }

    /**
     * Validar chave pix
     * @author Starley Cazorla
     * @param inputPix
     * @returns  {chavePix, tipoChave, isValid}
     */
    validarChavePIX(inputPix: string) {
        const chavePIX = inputPix;

        const regexCPF = /^\d{11}$/;
        const regexCNPJ = /^\d{14}$/;
        const regexCelular = /^\d{10,11}$/;
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const regexChaveAleatoria = /^[a-zA-Z0-9]{32}$/;

        const chaveSemMascara = chavePIX.replace(/\W/g, '');

        let boraFazerUmPix = {
            chavePIX: '',
            tipoChave: '',
            isValid: false
        };

        if ((regexCelular.test(chaveSemMascara) && this.validarNumeroTelefone(chaveSemMascara)) && !this.validarCPF(chaveSemMascara)) {
            // Chave é um número de celular válido
            boraFazerUmPix.chavePIX = `(${chaveSemMascara.substr(0, 2)}) ${chaveSemMascara.substr(2, 4)}-${chaveSemMascara.substr(6)}`;
            boraFazerUmPix.tipoChave = 'TELEFONE';
        } else if (regexEmail.test(chavePIX)) {
            // Chave é um email válido
            boraFazerUmPix.chavePIX = chavePIX;
            boraFazerUmPix.tipoChave = 'EMAIL';
        } else if (regexCPF.test(chaveSemMascara) && this.validarCPF(chaveSemMascara)) {
            // Chave é um CPF válido
            boraFazerUmPix.chavePIX = `${chaveSemMascara.substr(0, 3)}.${chaveSemMascara.substr(3, 3)}.${chaveSemMascara.substr(6, 3)}-${chaveSemMascara.substr(9)}`;
            boraFazerUmPix.tipoChave = 'CPF';
        } else if (regexCNPJ.test(chaveSemMascara) && !this.validarCNPJ(chaveSemMascara)) {
            // Chave é um CNPJ válido
            boraFazerUmPix.chavePIX = `${chaveSemMascara.substr(0, 2)}.${chaveSemMascara.substr(2, 3)}.${chaveSemMascara.substr(5, 3)}/${chaveSemMascara.substr(8, 4)}-${chaveSemMascara.substr(12)}`;
            boraFazerUmPix.tipoChave = 'CNPJ';
        } else if (regexChaveAleatoria.test(chaveSemMascara) && chaveSemMascara.length === 32) {
            // Chave é uma chave aleatória válida
            boraFazerUmPix.chavePIX = chavePIX;
            boraFazerUmPix.tipoChave = 'CHAVE ALEATÓRIA';
        } else {
            // Chave não corresponde a nenhum formato válido
            boraFazerUmPix.chavePIX = chavePIX;
            boraFazerUmPix.tipoChave = 'INVÁLIDA';
        }

        boraFazerUmPix.isValid = boraFazerUmPix.tipoChave !== 'INVÁLIDA';

        return boraFazerUmPix;
    }

}