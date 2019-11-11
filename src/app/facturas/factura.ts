export class Factura{
    id: number;
    usuario_id: number;
    deudor_id: number;
    fecha_emision: string;
    fecha_vencimiento: string;
    numero_serie: string;
    numero_correlativo: string;
    tipo_pago: string;
    valor_venta: number;
    igv: number;
    precio_venta: number;
    monto_neto_pago: number;
    ruc_imprenta: string;
    fecha_impresion: string;
    numero_autorizacion_impresion: string;
}