# Script para probar la API de la tienda usando PowerShell
Write-Host "🧪 Probando API de Tienda con PowerShell..." -ForegroundColor Green
Write-Host ""

# Función para hacer requests
function Test-APIEndpoint {
    param(
        [string]$Method,
        [string]$Url,
        [string]$Body = $null
    )
    
    Write-Host "📡 $Method $Url" -ForegroundColor Cyan
    
    try {
        $headers = @{
            "Content-Type" = "application/json"
        }
        
        if ($Body) {
            $response = Invoke-RestMethod -Uri $Url -Method $Method -Headers $headers -Body $Body
        } else {
            $response = Invoke-RestMethod -Uri $Url -Method $Method -Headers $headers
        }
        
        Write-Host "✅ Respuesta:" -ForegroundColor Green
        $response | ConvertTo-Json -Depth 3
    } catch {
        Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "─" * 50
    Write-Host ""
}

# Base URL
$baseUrl = "http://localhost:3001"

Write-Host "🚀 Iniciando pruebas de la API..." -ForegroundColor Yellow
Write-Host ""

# 1. Health Check
Test-APIEndpoint -Method "GET" -Url "$baseUrl/api/health"

# 2. Obtener productos
Test-APIEndpoint -Method "GET" -Url "$baseUrl/api/productos"

# 3. Obtener categorías
Test-APIEndpoint -Method "GET" -Url "$baseUrl/api/categorias"

# 4. Obtener marcas
Test-APIEndpoint -Method "GET" -Url "$baseUrl/api/marcas"

# 5. Productos destacados
Test-APIEndpoint -Method "GET" -Url "$baseUrl/api/productos/destacados"

# 6. Registrar cliente (POST)
$clienteData = @{
    nombre = "Juan Pérez"
    email = "juan@ejemplo.com"
    telefono = "123456789"
    direccion = "Calle Principal 123"
} | ConvertTo-Json

Test-APIEndpoint -Method "POST" -Url "$baseUrl/api/clientes" -Body $clienteData

Write-Host "🎉 ¡Pruebas completadas!" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Consejos:" -ForegroundColor Yellow
Write-Host "   - Si ves errores, verifica que el servidor esté corriendo"
Write-Host "   - Los datos de ejemplo pueden no existir en tu base de datos"
Write-Host "   - Puedes modificar este script para probar otros endpoints"
Write-Host ""
pause 