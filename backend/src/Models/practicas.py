hora = 0
minuto = 2

while True:
    if hora == minuto:
        print(f"{hora:02d}:{minuto:02d}")
        break  # salimos del bucle

    minuto += 1
    if minuto == 60:
        minuto = 0
        hora += 1

    if hora == 24:
        break  # si llega a las 24:00, se detiene