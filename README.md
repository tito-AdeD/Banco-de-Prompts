<!-- ... existing code ... -->
        // Procesar archivo Excel / CSV cargado por el usuario
        function handleFileUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();

            reader.onload = function (e) {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array', cellDates: true });

                    // Tomar la primera hoja del libro
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];

                    // Convertir a JSON
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

                    if (!jsonData || jsonData.length === 0) {
                        showToast("El archivo está vacío");
                        return;
                    }

                    // Identificar si la primera fila son encabezados
                    let hasHeaders = false;
                    let titleIndex = 0;
                    let categoryIndex = 1;
                    let contentIndex = 2;

                    const firstRow = jsonData[0].map(cell => String(cell).toLowerCase().trim());

                    // Buscar coincidencias de columnas
                    firstRow.forEach((colName, index) => {
                        if (['titulo', 'título', 'nombre', 'prompt', 'tema', 'name', 'title'].some(k => colName.includes(k))) {
                            titleIndex = index;
                            hasHeaders = true;
                        }
                        if (['categoria', 'categoría', 'tag', 'etiqueta', 'tipo', 'category'].some(k => colName.includes(k))) {
                            categoryIndex = index;
                            hasHeaders = true;
                        }
                        if (['contenido', 'texto', 'prompt', 'descripcion', 'descripción', 'detalle', 'body', 'content'].some(k => colName.includes(k)) && index !== titleIndex) {
                            contentIndex = index;
                            hasHeaders = true;
                        }
                    });

                    const rowsToProcess = hasHeaders ? jsonData.slice(1) : jsonData;
                    let importedPrompts = [];

                    rowsToProcess.forEach((row, idx) => {
                        if (!row || row.length === 0) return;

                        // Obtener valores según índice
                        let rawTitle = row[titleIndex] ? String(row[titleIndex]).trim() : '';
                        let rawCategory = row[categoryIndex] ? String(row[categoryIndex]).trim() : 'General';
                        let rawContent = row[contentIndex] ? String(row[contentIndex]).trim() : '';

                        // Si solo hay una o dos columnas en la fila
                        if (!rawContent && rawTitle) {
                            if (row.length === 1) {
                                rawContent = rawTitle;
                                rawTitle = `Prompt #${prompts.length + importedPrompts.length + 1}`;
                            } else if (row.length >= 2) {
                                rawContent = String(row[1]).trim();
                            }
                        }

                        if (rawContent || rawTitle) {
                            importedPrompts.push({
                                id: Date.now() + idx + Math.floor(Math.random() * 1000),
                                title: rawTitle || rawContent.substring(0, 50) + '...',
                                category: rawCategory || 'General',
                                content: rawContent || rawTitle,
                                date: new Date().toLocaleDateString('es-ES')
                            });
                        }
                    });

                    if (importedPrompts.length > 0) {
                        prompts = [...importedPrompts, ...prompts];
                        saveToStorage();
                        renderPrompts();
                        updateCategoryFilter();
                        showToast(`¡Se cargaron ${importedPrompts.length} prompts con éxito!`);
                    } else {
                        showToast("No se encontraron prompts válidos en el archivo");
                    }
                } catch (error) {
                    console.error("Error leyendo archivo:", error);
                    alert("Error al procesar el archivo. Asegúrate de que sea un archivo .xlsx, .xls o .csv válido.");
                }

                // Limpiar input
                event.target.value = '';
            };

            reader.readAsArrayBuffer(file);
        }

        // Exportar Prompts actualizados a Excel
<!-- ... existing code ... -->
