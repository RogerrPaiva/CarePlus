import { ChevronDown, Search, User, Moon, HeadsetIcon } from "lucide-react";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import CarePlus from "../assets/CarePlus.svg";


function Header() {
  return (
    <header className="w-full border-t-[5px] border-t-neutral-700 bg-white">
      <div className="border-b border-neutral-200">
        <div className="mx-auto flex h-10 max-w-[1280px] items-center justify-between px-6 text-sm text-neutral-600">
          <div className="flex items-center ">

            <button href="#" className="cursor-pointer group relative overflow-hidden px-5 py-2.5 font-Roboto font-bold">
                <span className="absolute left-0 top-0 h-0 w-full bg-[#7AD1C3] transition-all duration-300 group-hover:h-full"></span>
                <span className="relative z-10">A+</span>
            </button>
            <button href="#" className="cursor-pointer group relative overflow-hidden px-5 py-2.5 font-Roboto font-bold">
                <span className="absolute left-0 top-0 h-0 w-full bg-[#7AD1C3] transition-all duration-300 group-hover:h-full"></span>
                <span className="relative z-10">A-</span>
            </button>

          </div>
          <div className="flex items-center gap-10">
            <a href="#" className="group relative overflow-hidden px-5 py-2.5 font-Roboto font-bold">
                <span className="absolute left-0 top-0 h-0 w-full bg-[#7AD180] transition-all duration-300 group-hover:h-full"></span>
                <span className="relative z-10">Benefício</span>
            </a>

            <a href="#" className="group relative overflow-hidden px-5 py-2.5 font-Roboto font-bold">
                <span className="absolute left-0 top-0 h-0 w-full bg-[#7AD180] transition-all duration-300 group-hover:h-full"></span>
                <span className="relative z-10">RH</span>
            </a>

            <a href="#" className="group relative overflow-hidden px-5 py-2.5 font-Roboto font-bold">
                <span className="absolute left-0 top-0 h-0 w-full bg-[#7AD180] transition-all duration-300 group-hover:h-full"></span>
                <span className="relative z-10">Corretor</span>
            </a>

            <a href="#" className="group relative overflow-hidden px-5 py-2.5 font-Roboto font-bold">
                <span className="absolute left-0 top-0 h-0 w-full bg-[#7AD180] transition-all duration-300 group-hover:h-full"></span>
                <span className="relative z-10">Credenciado</span>
            </a>
          </div>
          

          <div className="flex items-center gap-4">
            <HeadsetIcon size={18} />
            <button className="cursor-pointer hidden sm:inline">0800-013-2992</button>
            <span className="hidden sm:inline">-</span>
            <button className="cursor-pointer hidden sm:inline">0800-771-7750</button>
          </div>
        </div>
      </div>

      <div className="border-b-[3px] border-[#1C9770]">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
          <img src={CarePlus} alt="CarePlus" className="w-50 h-auto" />

    <nav className="hidden items-center gap-10 lg:flex">
        <div className="relative group">
        <button className="cursor-pointer flex items-center gap-1 text-[17px] font-medium text-neutral-700 transition hover:text-neutral-900">
        A CarePlus
        <ChevronDown size={16} />
        </button>
            <div className="cursor-pointer absolute left-0 top-full z-20 hidden w-[560px] bg-white px-8 py-6 shadow-md group-hover:block">
                <div className="grid grid-cols-2 gap-x-16 gap-y-5">
                    <a href="#" className="text-sm text-neutral-700 transition hover:text-[#1C9770]">A Empresa</a>
                    <a href="#" className="text-sm text-neutral-700 transition hover:text-[#1C9770]">Perguntas Frequentes</a>
                    <a href="#" className="text-sm text-neutral-700 transition hover:text-[#1C9770]">Diferenciais</a>
                    <a href="#" className="text-sm text-neutral-700 transition hover:text-[#1C9770]">Materiais de Saúde</a>
                    <a href="#" className="text-sm text-neutral-700 transition hover:text-[#1C9770]">Rede Plus</a>
                    <a href="#" className="text-sm text-neutral-700 transition hover:text-[#1C9770]">Declaração de Cookies</a>
                    <a href="#" className="text-sm text-neutral-700 transition hover:text-[#1C9770]">Gestão de Saúde</a>
                    <a href="#" className="text-sm text-neutral-700 transition hover:text-[#1C9770]">Termos e Condições</a>
                    <a href="#" className="text-sm text-neutral-700 transition hover:text-[#1C9770]">O Lado Plus da Saúde</a>
                    <a href="#" className="text-sm text-neutral-700 transition hover:text-[#1C9770]">Portal de Privacidade</a>
                    <a href="#" className="text-sm text-neutral-700 transition hover:text-[#1C9770]">Responsabilidade Social</a>
                    <a href="#" className="text-sm text-neutral-700 transition hover:text-[#1C9770]">Resultados Financeiros</a>
                    <span></span>
                    <a href="#" className="text-sm text-neutral-700 transition hover:text-[#1C9770]">Exerça seus Direitos</a>
                </div>
            </div>
        </div>
        <div className="relative group">
            <button className="cursor-pointer flex items-center gap-1 text-[17px] font-medium text-neutral-700 transition hover:text-neutral-900">
            Planos e Produtos
            <ChevronDown size={16} />
            </button>
            <div className="cursor-pointer absolute left-0 top-full z-20 hidden w-[400px] bg-white px-8 py-6 shadow-md group-hover:block">
                <div className="grid grid-cols-2 gap-x-12 gap-y-5">
                    <a href="#" className="text-sm text-neutral-700 hover:text-[#1C9770]">Planos individuais</a>
                    <a href="#" className="text-sm text-neutral-700 hover:text-[#1C9770]">Planos empresariais</a>
                    <a href="#" className="text-sm text-neutral-700 hover:text-[#1C9770]">Coberturas</a>
                    <a href="#" className="text-sm text-neutral-700 hover:text-[#1C9770]">Benefícios</a>
                    <a href="#" className="text-sm text-neutral-700 hover:text-[#1C9770]">Tabela de preços</a>
                    <a href="#" className="text-sm text-neutral-700 hover:text-[#1C9770]">Comparar planos</a>
                </div>
            </div>
        </div>
        <div className="relative group">
            <button className="cursor-pointer flex items-center gap-1 text-[17px] font-medium text-neutral-700 transition hover:text-neutral-900">
            Carreira
            <ChevronDown size={16} />
            </button>

            <div className="cursor-pointer absolute left-0 top-full z-20 hidden w-[180px] bg-white px-8 py-6 shadow-md group-hover:block">
                <div className="flex flex-col gap-y-5">
                    <a href="#" className="text-sm text-neutral-700 hover:text-[#1C9770]">Carreiras</a>
                    <a href="#" className="text-sm text-neutral-700 hover:text-[#1C9770]">Vagas</a>
                </div>
            </div>
        </div>
        <div className="relative group">
            <button className="cursor-pointer flex items-center gap-1 text-[17px] font-medium text-neutral-700 transition hover:text-neutral-900">
            Fale Conosco
            <ChevronDown size={16} />
            </button>

            <div className="cursor-pointer absolute left-0 top-full z-20 hidden w-[180px] bg-white px-8 py-6 shadow-md group-hover:block">
                <div className="flex flex-col gap-y-5">
                    <a href="#" className="text-sm text-neutral-700 hover:text-[#1C9770]">Solicite uma proposta</a>
                    <a href="#" className="text-sm text-neutral-700 hover:text-[#1C9770]">Contato</a>
                    <a href="#" className="text-sm text-neutral-700 hover:text-[#1C9770]">Canal de Denúncias</a>
                </div>
            </div>
        </div>
    </nav>

          <div className="flex items-center gap-6">
            <div className="hidden h-12 w-px bg-neutral-200 md:block" />

            <button className="cursor-pointer flex items-center gap-2 text-[17px] text-neutral-700 transition hover:text-neutral-900">
              <span className="hidden sm:inline">Buscar</span>
              <Search size={20} />
            </button>

            <button className="cursor-pointer font-roboto flex items-center gap-2 rounded-lg bg-[#1C9770] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[#157A5A]">
              Seja Plus
              <User size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;